import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import {
  API_ENDPOINT,
  CUSTOMERS_POSTFIX,
  REGISTER_ENDPOINT,
} from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { getCustomer } from "./getCustomerDispatcher";

export const createCustomer = (
  customer: Customer,
  logInAfterCreation: boolean,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  createCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + REGISTER_ENDPOINT}`, customer)
    .then((response) => {
      createCustomerSuccess(customer, dispatch);
      if (logInAfterCreation) {
        getCustomer(
          { email: customer.email, password: customer.password },
          dispatch
        );
      } else {
        toastr.success("Account created", "Welcome on board!");
      }
    })
    .catch((error) => {
      createCustomerFailed(dispatch);
      toastr.error("Error", "Customer can't be created.");
    });
};

const createCustomerSuccess = (
  customer: Customer,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
    payload: customer,
  });
};
const createCustomerPending = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_PENDING,
    payload: {},
  });
};
const createCustomerFailed = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.CREATE_CUSTOMER_FAILED,
    payload: {},
  });
};
