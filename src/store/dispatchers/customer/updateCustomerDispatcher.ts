import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";

export const updateCustomer = (
  customer: Customer,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  updateCustomerPending(dispatch);
  axios
    .put(`${API_ENDPOINT + CUSTOMERS_POSTFIX}/${customer.email}`, customer)
    .then((response) => {
      updateCustomerSuccess(customer, dispatch);
    })
    .catch((error) => {
      updateCustomerFailed(dispatch);
      toastr.error("Error", "Customer can't be updated.");
    });
};

const updateCustomerSuccess = (
  customer: Customer,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  dispatch({
    type: CustomerActionStatuses.UPDATE_CUSTOMER_SUCCESSFUL,
    payload: customer,
  });
};
const updateCustomerPending = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.UPDATE_CUSTOMER_PENDING,
    payload: {},
  });
};
const updateCustomerFailed = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.UPDATE_CUSTOMER_FAILED,
    payload: {},
  });
};
