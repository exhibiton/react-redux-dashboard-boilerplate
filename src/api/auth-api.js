import axios from 'axios'
import apiEndpoints from '../../config/apis'
import { destroyToken, setAuthorizationToken } from './utils/authorization-token'
import jwt from 'jsonwebtoken'
import toastr from 'toastr'
import { browserHistory } from 'react-router'

import { loginLoading, loginSuccess, loginFail, onLogout } from '../actions/auth-actions'

export const login = data => dispatch => {
  dispatch(loginLoading())
  // This is where you handle the actual JWT auth.
  // return axios({
  //   method: 'POST',
  //   url: `${apiEndpoints.api}/sign_in`,
  //   params: data,
  // }).then(res => {
  //   const token = res.data.auth_token
  //   const user = jwt.decode(token)

  //   setAuthorizationToken(token)
  //   dispatch(loginSuccess(user))
  //   browserHistory.push('/')
  // }).catch(error => {
  //   toastr.error(error.response.data.errors)
  //   dispatch(loginFail(error.response.data.errors))
  // })

  // Mockdata to simulate login.
  const user = {
    id: 1,
    email: 'email@test.com',
    first_name: 'John',
    last_name: 'Doe',
  }

  setAuthorizationToken('randomfaketoken')
  dispatch(loginSuccess(user))
  browserHistory.push('/')
}

export const logout = () => dispatch => {
  destroyToken()
  dispatch(onLogout())
  browserHistory.push('/')
}
