export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_LOADING = 'LOGIN_LOADING'
export const LOGOUT = 'LOGOUT'

export const loginSuccess = promise => ({
  type: LOGIN_SUCCESS,
  payload: promise,
})

export const loginFail = promise => ({
  type: LOGIN_FAIL,
  payload: promise,
})

export const loginLoading = () => ({
  type: LOGIN_LOADING,
})
export const onLogout = () => ({
  type: LOGOUT,
})
