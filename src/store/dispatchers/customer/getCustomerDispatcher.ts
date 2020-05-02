import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { DispatchAction } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";

export const getCustomer = (
  customer: Customer,
  dispatch: Dispatch<DispatchAction>
) => {
  getCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, customer)
    .then((response) => {
      getCustomerSuccess(customer, dispatch);
    })
    .catch((error) => {
      getCustomerFailed(dispatch);
    });
};

const getCustomerSuccess = (
  customer: Customer,
  dispatch: Dispatch<DispatchAction>
) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
    payload: customer,
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
