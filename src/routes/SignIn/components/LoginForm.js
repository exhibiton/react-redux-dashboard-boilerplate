import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from '../../../components/Input'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: #fff;
  font-weight: 600;
  background: #1c1f2b;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: .875rem;
  padding: 1rem 3rem;
  line-height: 1;
  margin: 1rem 0;
  width: 100%;
`


const LoginForm = props => {
  const { error, handleSubmit, submitting } = props;

  return (
    <form onSubmit={ handleSubmit }>
      {error && <div className="mb-3 color-red"><strong>{error}</strong></div>}
      <Field
        className="mb-3"
        component={ Input }
        name="email"
        type="input"
        placeholder="Email Address" />
      <Field
        className="mb-3"
        component={ Input }
        name="password"
        type="password"
        placeholder="Password" />
      <div>
        <StyledButton type="submit" disabled={ submitting }>
          Log In
        </StyledButton>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
}

export default reduxForm({
  form: 'LoginForm',
})(LoginForm)
