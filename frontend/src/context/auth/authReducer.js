import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  PASSWORD_FAIL,
} from '../types';

export default function AuthReducer(state, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      // localStorage.removeItem('start');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        user: null,
        isAdmin: false,
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
