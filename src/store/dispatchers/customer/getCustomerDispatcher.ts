import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { DispatchAction } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";

export const getCustomer = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<DispatchAction>
) => {
  getCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, customerCredentials)
    .then((response) => {
      getCustomerSuccess(customerCredentials, dispatch);
    })
    .catch((error) => {
      getCustomerFailed(dispatch);
    });
};

const getCustomerSuccess = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<DispatchAction>
) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
    payload: customerCredentials,
  });
};
const getCustomerPending = (dispatch: Dispatch<DispatchAction>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_PENDING,
    payload: {},
  });
};
const getCustomerFailed = (dispatch: Dispatch<DispatchAction>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_FAILED,
    payload: {},
  });
};
