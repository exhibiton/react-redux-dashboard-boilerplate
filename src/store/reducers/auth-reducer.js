import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../../actions/auth-actions'

const initialState = {
  currentUser: {},
  isSignedIn: false,
  isSigningIn: true,
  error: null,
  messages: {},
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isSignedIn: true,
        isSigningIn: false,
      }

    case LOGIN_LOADING:
      return {
        ...state,
        isSigningIn: true,
      }

    case LOGOUT:
      return {
        ...state,
        currentUser: {},
        isSignedIn: false,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,
      }

    default:
      return state
  }
}
