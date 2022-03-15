import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

// INITIAL STATE
const AuthState = (props) => {
  const InitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null,
    user: null,
    isAdmin: false,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, InitialState);

  //Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get(`/api/v1/users/me`);
        dispatch({ type: USER_LOADED, payload: res.data });
      } catch (error) {
        dispatch({ type: AUTH_ERROR });
      }
    }
  };

  //Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/v1/users`, formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // load user data if register success
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/v1/users/login`, formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      // load user data if login success
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  //Logout
  const logout = () => {
    dispatch({ type: LOGOUT, payload: null });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        isAdmin: state.isAdmin,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
