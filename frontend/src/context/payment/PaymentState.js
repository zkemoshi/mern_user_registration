import React, { useReducer } from 'react';
import axios from 'axios';
import PaymentContext from './paymentContext';
import PaymentReducer from './paymentReducer';

import {
  ADD_INVOICE,
  SET_CURRENT,
  CLEAR_CURRENT,
  INVOICE_ERROR,
  GET_INVOICE,
  GET_INVOICES,
  CLEAR_INVOICE,
  CLEAR_ERRORS,
  SET_LOADING,
  CONFIRM_INVOICE,
  DELETE_INVOICE,
} from '../types';

// Initial State
const PaymentState = (props) => {
  const InitialState = {
    invoices: [],
    current: null,
    transToken: localStorage.getItem('localToken'),
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(PaymentReducer, InitialState);

  //Add Payment and Send Email request..
  const addInvoice = async (paymentData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/v1/payments`, paymentData, config);
      dispatch({
        type: ADD_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Payments details based on Token From Email
  const getInvoice = async (token) => {
    try {
      const res = await axios.get(`/api/v1/payments/pay/${token}`);
      dispatch({
        type: GET_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Confirm Payment after DPO
  const confirmInvoice = async (transtoken) => {
    try {
      const res = await axios.get(`/api/v1/payments/confirm/${transtoken}`);
      dispatch({
        type: CONFIRM_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Invoice details from DB
  const getInvoices = async () => {
    try {
      const res = await axios.get('/api/v1/payments');
      dispatch({
        type: GET_INVOICES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Delete invoice details from DB
  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`/api/v1/payments/${id}`);

      dispatch({
        type: DELETE_INVOICE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: INVOICE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //Set Current payment
  const setCurrent = (payment) => {
    dispatch({ type: SET_CURRENT, payload: payment });
  };

  //Clear Current payment
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Clear Payments
  const clearInvoices = () => {
    dispatch({ type: CLEAR_INVOICE });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <PaymentContext.Provider
      value={{
        invoices: state.invoices,
        transToken: state.transToken,
        current: state.current,
        loading: state.loading,
        error: state.error,
        setCurrent,
        setLoading,
        clearCurrent,
        addInvoice,
        getInvoice,
        getInvoices,
        clearErrors,
        clearInvoices,
        confirmInvoice,
        deleteInvoice,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
