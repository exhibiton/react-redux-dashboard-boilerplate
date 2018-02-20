import React from 'react'
import { browserHistory } from 'react-router'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

class HomeView extends React.Component {
  static propTypes = {
    isLoading: propTypes.bool,
    currentUser: propTypes.object.isRequired,
  }

  componentDidMount() {
    this.runChecks()
  }

  componentDidUpdate() {
    this.runChecks()
  }

  runChecks() {
    const { isLoading, currentUser } = this.props

    if (isLoading) return false
    else if (currentUser) {
      browserHistory.push('/secret')
    }

    return true
  }
  render() {
    return (
      <div>
        Loading
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser, isSigningIn } = state.auth

  return {
    isLoading: isSigningIn,
    currentUser,
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
