import {
  ADD_INVOICE,
  SET_CURRENT,
  CLEAR_CURRENT,
  INVOICE_ERROR,
  CLEAR_INVOICE,
  GET_INVOICE,
  GET_INVOICES,
  CLEAR_ERRORS,
  SET_LOADING,
  CONFIRM_INVOICE,
  DELETE_INVOICE,
} from '../types';

const PaymentReducer = (state, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
        transToken: action.payload.transToken,
        loading: false,
        // current: null,
      };
    case GET_INVOICE:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_INVOICE:
      return {
        ...state,
        invoices: null,
        transToken: localStorage.removeItem('localToken'),
        error: null,
        current: null,
        loading: false,
        client: null,
      };
    case CONFIRM_INVOICE:
      return {
        ...state,
        transToken: null,
        loading: false,
        current: action.payload,
      };

    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
        loading: false,
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        ),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case INVOICE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default PaymentReducer;
