import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import authHeader from "../../../jwt/jwtHeaderGetter";

export const updateCustomer = (
  customer: Customer,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  updateCustomerPending(dispatch);
  axios
    .put(`${API_ENDPOINT + CUSTOMERS_POSTFIX}/${customer.email}`, customer, {
      headers: authHeader(),
    })
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

export const updateCustomerAddress = (
  customer: Customer,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  updateCustomerPending(dispatch);
  axios
    .put(
      `${API_ENDPOINT + CUSTOMERS_POSTFIX}/${customer.email}/address`,
      customer,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      updateCustomerSuccess(customer, dispatch);
      // localStorage.setItem("user", JSON.stringify(response.data));
      // @ts-ignore
      let parse = JSON.parse(localStorage.getItem("user"));
      parse.address = response.data.address;
      localStorage.setItem("user", JSON.stringify(parse));
    })
    .catch((error) => {
      updateCustomerFailed(dispatch);
      toastr.error("Error", "Customer can't be updated.");
    });
};
