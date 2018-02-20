/*  1. ReactRouter -  Create PlainRoute definition object  */
export default () => ({
  path: 'secret',
  indexRoute: {

    /*  2. ReactRouter -  Invoked when path match (lazy)  */
    getComponent(nextState, cb) {

      /*  3. Webpack (build) -  Create split point
      4. Webpack (runtime) -  Load async chunk with embedded json client  */
      require.ensure([], require => {

        /*  5. Webpack (build) -  Require all bundle contents  */
        const Secret = require('./components/SecretView').default

        /*  6. Redux -  Use store and helper to add async reducer  */
        /* injectReducer(store, { key: 'secret', reducer }) */

        /*  7. ReactRouter -  Return component */
        cb(null, Secret)

        /*  8. Webpack -  Provide a name for bundle  */
      }, 'secret')
    },
  },

  /*  8. ReactRouter - Define SubRoutes at ./routes/
  childRoutes: [
    SubRoute(store),
  ],
  */

})

