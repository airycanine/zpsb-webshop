import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { DispatchAction } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";

export const createCustomer = (
  customer: Customer,
  dispatch: Dispatch<DispatchAction>
) => {
  createCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, customer)
    .then((response) => {
      createCustomerSuccess(customer, dispatch);
    })
    .catch((error) => {
      createCustomerFailed(dispatch);
    });
};

const createCustomerSuccess = (
  customer: Customer,
  dispatch: Dispatch<DispatchAction>
) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
    payload: customer,
  });
};
const createCustomerPending = (dispatch: Dispatch<DispatchAction>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_PENDING,
    payload: {},
  });
};
const createCustomerFailed = (dispatch: Dispatch<DispatchAction>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_FAILED,
    payload: {},
  });
};
