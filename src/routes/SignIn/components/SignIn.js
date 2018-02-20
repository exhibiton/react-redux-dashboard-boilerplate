import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { login } from '../../../api/auth-api'
import LoginForm from './LoginForm'

const StyledCol = styled(Col)`
  max-width: 25rem;
`

const StyledRow = styled(Row)`
  height: 100vh;
`

class SignIn extends React.Component {
  static propTypes = {
    login: propTypes.func.isRequired,
  }

  handleSignIn = data =>
    this.props.login(data)

  render() {
    return (
      <StyledRow>
        <Col className="align-self-center">
          <Row className="no-gutters justify-content-center">
            <StyledCol>
              <div className="py-5 px-4">
                <div className="text-center">
                  <h2 className="py-3">Welcome to Login!</h2>
                  <p>Login to view secret images.</p>
                </div>
                <LoginForm onSubmit={ this.handleSignIn } />
              </div>
            </StyledCol>
          </Row>
        </Col>
      </StyledRow>
    )
  }
}

const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(SignIn)
