import React from 'react'
import propTypes from 'prop-types'

export const CoreLayout = ({ children }) => (
  <div className="children">
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: propTypes.node,
}

export default CoreLayout
