import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { DispatchAction } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { getCustomer } from "./getCustomerDispatcher";
import { useHistory } from "react-router-dom";

export const createCustomer = (
  customer: Customer,
  logInAfterCreation: boolean,
  dispatch: Dispatch<DispatchAction>
) => {
  createCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, customer)
    .then((response) => {
      createCustomerSuccess(customer, dispatch);
      if (logInAfterCreation) {
        getCustomer({ email: customer.email, password: "test" }, dispatch);
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
