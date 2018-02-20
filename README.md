# React Redux Dashboard Boilerplate

A very opinionated boilerplate by me, mainly for me. Use if you like. This project is basically the blueprint where I start my new projects from. It started by using [davezuko's](https://github.com/davezuko/react-redux-starter-kit) boilerplate and has evolved in my projects, professional and personal. I like JWT and REST. Maybe I'll do one for GraphQL in the future, but this starter optimizes my speed to start new projects. 

This readme just combines other docs, mainly to get anyone started quickly, from mine/bootstrap/react-redux-starter/icomoon.

## Application Blueprint:

- React
- Redux
- Styled Components
- Redux-Persist
- Eslint & Prettier working together
- React Router v3
- Bootstrap 4 with Reactstrap
- JWT Auth with mocked option
- My most used packages included, such as dropzone, lodash, select etc.

This project structure is something that has

## Fractal Project Structure

_Also known as: Self-Contained Apps, Recursive Route Hierarchy, Providers, etc_

Small applications can be built using a flat directory structure, with folders for `components`, `containers`, etc. However, this structure does not scale and can seriously affect development velocity as your project grows. Starting with a fractal structure allows your application to organically drive its own architecture from day one.

This structure provides many benefits that may not be immediately obvious:
* Routes can be bundled into "chunks" using webpack's [code splitting](https://webpack.github.io/docs/code-splitting.html) and merging algorithm. This means that the entire dependency tree for each route can be omitted from the initial bundle and then loaded *on demand*.
* Since logic is self-contained, routes can easily be broken into separate repositories and referenced with webpack's [DLL plugin](https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin) for flexible, high-performance development and scalability.

Large, mature apps tend to naturally organize themselves in this way—analogous to large, mature trees (as in actual trees :evergreen_tree:). The trunk is the router, branches are route bundles, and leaves are views composed of common/shared components/containers. Global application and UI state should be placed on or close to the trunk (or perhaps at the base of a huge branch, eg. `/app` route).

*Note: We recommend keeping your store flat, which is not strictly fractal. However, this structure provides a rock-solid foundation for creating or migrating to truly fractal apps by dropping in frameworks such as [redux-elm](https://github.com/salsita/redux-elm).*

#### Code Splitting Anatomy

We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application.

It's important to understand how webpack integrates with `react-router` to implement code splitting, and how everything is tied together with redux. Let's dissect the counter route definition:

```js
/*  1. ReactRouter -  Create PlainRoute definition object  */
export default (store) => ({
  path: 'counter',
  
  /*  2. ReactRouter -  Invoked when path match (lazy)  */
  getComponent (nextState, cb) {
  
    /*  3. Webpack (build) -  Create split point
        4. Webpack (runtime) -  Load async chunk with embedded jsonp client  */
    require.ensure([], (require) => {
    
      /*  5. Webpack (build) -  Require all bundle contents  */
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  6. Redux -  Use store and helper to add async reducer  */
      injectReducer(store, { key: 'counter', reducer })

      /*  7. ReactRouter -  Return component */
      cb(null, Counter)

    /*  8. Webpack -  Provide a name for bundle  */
    }, 'counter')
  }
})
```

 1. **ReactRouter** - We export a function that accepts the instantiated store for async reducer/middleware/etc injection and returns a `PlainRoute` object *evaluated by react-router during application bootstrap*.
 2. **ReactRouter** - The `getComponent` callback is registered but it is not invoked until the route is matched, so it is the perfect place to encapsulate and load our bundled logic at runtime.
 3. **Webpack (Build)** - Webpack uses the `require.ensure` callback to create a split point and replaces it with a call to it's own internal `jsonp` client with relevant module information.
 4. **Webpack (Runtime)** - Webpack loads your bundle over the network.
 5. **Webpack (Build)** - Webpack walks the required dependency tree and runs a chunking algorithm to merge modules into an async bundle, also known as code-splitting.
 6. **Redux** - Use `injectReducer` helper and instantiated store to inject `counter` reducer on key 'counter'
 7. **ReactRouter** - Pass resolved component back up to `Router` (using CPS callback signature)
 8. **Webpack (Build)** - Create named chunk using `require.ensure` callback


**Notes**

- Your entire route hierarchy **can and should** be loaded during application bootstrap, since code-splitting and bundle loading happens lazily in `getComponents` the route definitions should be registered in advance!
- Additional child routes can be nested in a fractal hierarchy by adding `childRoutes`
- This structure is designed to provide a flexible foundation for module bundling and dynamic loading
- Using a fractal structure is optional, smaller apps might benefit from a flat routes directory

**Usage with JSX**

We recommend using POJO (Plain Old Javascript Object) route definitions, however you can easily integrate them with JSX routes using React Router's [`createRoutes`](https://github.com/reactjs/react-router/blob/master/docs/API.md#createroutesroutes) helper. Example of POJO routes using JSX:
 
```js
// ...
import SubRoutes from './routes/SubRoutes' // JSX Routes

export default {
  path: '/component',
  component: Component,
  children: createRoutes(SubRoutes)
}

```

- Alternatively, the JSX route definition file can `export default createRoutes(<Route />)`
- JSX can easily use POJO routes by passing them as a prop, ie `<Route children={PlainRoute} />`
 


#### Recommendations

Above all, you should seek to find the best solution for the problem you are trying to solve. This setup will not fit every use case, but it is extremely flexible. There is no "right" or "wrong" way to set up your project. Here are some general recommendations that we have found useful. If you would like to add something, please submit a PR.

##### Routes
* A route directory...
  - *Should* contain an `index.js` that returns route definition
  - **Optional:** assets, components, containers, redux modules, nested child routes
  - Additional child routes can be nested within `routes` directory in a fractal hierarchy

##### Store
 - Your store **should not reflect the hierarchy of your folder structure**
 - Keep your store as flat and normalized as possible. If you are dealing with deeply nested data structures, we recommend using a tool such as [normalizr](https://github.com/gaearon/normalizr).
 - Note that the `injectReducer` helper can be repurposed to suit your needs.

##### Layouts
* Stateless components that dictate major page structure
* Useful for composing `react-router` [named components](https://github.com/reactjs/react-router/blob/master/docs/API.md#components-1) into views

##### Components
* Prefer [stateless functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
  - eg: `const HelloMessage = ({ name }) => <div>Hello {name}</div>`
* Top-level `components` and `containers` directories contain reusable components

##### Containers
* Containers **only** `connect` presentational components to actions/state
  - Rule of thumb: **no JSX in containers**!
* One or many container components can be composed in a stateless functional components
* Tip: props injected by `react-router` can be accessed using `connect`:
  ```js
    // CounterWithMusicContainer.js
    import { connect } from 'react-redux'
    import Counter from 'components/Counter'
    export const mapStateToProps = (state, ownProps) => ({
      counter: state.counter,
      music: ownProps.location.query.music // why not
    })
    export default connect(mapStateToProps)(Counter)

    // Location -> 'localhost:3000/counter?music=reggae'
    // Counter.props = { counter: 0, music: 'reggae' }
  ```
## CSS

The main scss file is src/styles/core.scss. Any new css should be placed in one of the following sections based on its purpose. CSS for vendor libraries should also be imported here. 
  
* base - fundamental css classes used throughout the application
* ui_components - styling of components like buttons, inputs, etc. 
* components - css specific to a React component

All sizes should be defined in rem as opposed to px. (serious) 

### Vendor files

To include a vendor css file, locate the file you want to include within node_modules and import it starting with a ~. 
```scss
@import '~bootstrap/dist/css/bootstrap';
```

### Base CSS

These css classes are the fundamental building blocks that all components can utilize. These include colors, layout, and typography. 

Spacing and breakpoints should be using Bootstrap 4.

#### Colors 

All colors should be placed in the $color-map in _colors.scss. Classes will be generated with the name of the color to easily control the color, background-color, and border-color properties of an element. 

* Apply a color to an element:
  ```html
  <div className="color-(name)"></div>
  ```

* Apply a background-color to an element:
  ```html
  <div className="color-bg-(name)"></div>
  ```

* Apply a border color to an element:
  ```html
  <div className="color-bd-(name)"></div>
  ```
  
* Within scss files, these classes can be extended, or references from the $color-map variable. 
  ```scss
  @extend .color-bg-white;
  border-top: 2px solid map_get($color-map, 'white');
  ```

#### Typography

Use the classes generated in _typography.scss for defining the font sizes of elements. 

- t1: font size of 3rem (48px)
- t2: font size of 1.5rem (24px)
- t3: font size of 1.25rem (20px)
- t4: default font size of 1rem (16px)
- t5: default font size of .875rem (14px)
- t6: default font size of .625rem (10px)

The font sizes are also applied to h1-h6 elements, which will have a font-weight of 700.

It also contains some utility classes around text, such as text-uc to for a text-transform of uppercase.

## Layout

[Flexbox docs from Bootstrap 4](https://getbootstrap.com/docs/4.0/utilities/flex/)

## Spacing
 
### How it works

Assign responsive-friendly `margin` or `padding` values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties. Classes are built from a default Sass map ranging from `.25rem` to `3rem`.


### Notation

Spacing utilities that apply to all breakpoints, from `xs` to `xl`, have no breakpoint abbreviation in them. This is because those classes are applied from `min-width: 0` and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.

The classes are named using the format `{property}{sides}-{size}` for xs and `{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, `lg`, and `xl`.

Where property is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where sides is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `l` - for classes that set `margin-left` or `padding-left`
- `r` - for classes that set `margin-right` or `padding-right`
- `x` - for classes that set both `*-left` and `*-right`
- `y` - for classes that set both `*-top` and `*-bottom`
- blank - for classes that set a margin or padding on all 4 sides of the element

Where size is one of:

- `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
- `1` - (by default) for classes that set the `margin` or `padding` to `$spacer * .25`
- `2` - (by default) for classes that set the `margin` or `padding` to `$spacer * .5`
- `3` - (by default) for classes that set the `margin` or `padding` to `$spacer`
- `4` - (by default) for classes that set the `margin` or `padding` to `$spacer * 1.5`
- `5` - (by default) for classes that set the `margin` or `padding` to `$spacer * 3`
- `auto` - for classes that set the `margin` to `auto`
(You can add more sizes by adding entries to the `$spacers` Sass map variable.)


## Icons

Preferred icon usage:

Prefer including icons by using the dashboard-icons font, which can be updated using the [IcoMoon](https://icomoon.io/) app. 

### Usage 

Look at src/styles/base/_dashboard_icons.scss for the list of available icons. You can control the icon size and color through the css properties font-size and color. 

* HTML:
  ```html
  <i className="icon-(name)"/>
  ```
* CSS:
  ```scss
  &:before {
    content: $icon-(name);
  }
  ```

### Updating the font files

Go to the IcoMoon app, click the 'Import Icons' button, and upload the file src/assets/icon/icomoon/selection.json. Once uploaded, you will see the current set of svg icons available in the font. To add additional icons, click the menu hamburger at the right of the set, and import any additional svg files. The icon name will default to the filename, and to change it click the pencil button to change to edit mode, then click the icon to edit the name.  

In order to use an svg in an icon font, it must only have a single color, and all strokes must be converted to outlines. See more information here: [Converting Strokes to Fills](https://icomoon.io/#docs/stroke-to-fill)

Once the set has been updated, select all the icons in the set and click 'Generate Font' at the bottom right of the screen. Click download to generate the updated font files. The generated files mentioned below should be placed in the following locations: 

* selection.json -> src/assets/icon/icomoon/selection.json
* fonts/* -> src/styles/fonts/dashboard_icons/
* Update src/styles/base/_dashboard_icons.scss with the content of variables.scss and styles.scss. Ensure the paths all point to ../../fonts/dashboard_icons
