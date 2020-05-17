import { Dispatch } from "redux";
import {
  CustomerActionStatuses,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";

export const getCustomer = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  getCustomerPending(dispatch);
  axios
    .get(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, {
      params: {
        email: customerCredentials.email,
        password: customerCredentials.password,
      },
    })
    .then((response: any) => {
      getCustomerSuccess(response.data, dispatch);
      toastr.success("Logged in", "Welcome!");
    })
    .catch((error: any) => {
      getCustomerFailed(dispatch);
      toastr.error("Error", "An error occured while logging in..");
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
