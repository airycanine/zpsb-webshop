import { Dispatch } from "redux";
import {
  CustomerActionStatuses,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import {
  API_ENDPOINT,
  CUSTOMERS_POSTFIX,
  LOG_IN_ENDPOINT,
} from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";

export const getCustomer = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  getCustomerPending(dispatch);
  axios
    .post(`${API_ENDPOINT + LOG_IN_ENDPOINT + "/"}`, customerCredentials)
    .then((response: any) => {
      getCustomerSuccess(response.data, dispatch);
      localStorage.setItem("user", JSON.stringify(response.data));
      toastr.success("Logged in", "Welcome!");
    })
    .catch((error: any) => {
      getCustomerFailed(dispatch);
      toastr.error("Error", `Can't log in`);
    });
};

const getCustomerSuccess = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_SUCCESSFUL,
    payload: customerCredentials,
  });
};
const getCustomerPending = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_PENDING,
    payload: {},
  });
};
const getCustomerFailed = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_FAILED,
    payload: {},
  });
};
