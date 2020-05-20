import { Dispatch } from "redux";
import axios from "axios";
import {
  API_ENDPOINT,
  CARS_POSTFIX,
  CUSTOMERS_POSTFIX,
} from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car } from "../../../interfaces/CarInfo";
import authHeader from "../../../jwt/jwtHeaderGetter";
import {
  AdminActionDispatch,
  AdminActionStatuses,
} from "../../../interfaces/AdminInfo";
import { Customer } from "../../../interfaces/CustomerInfo";
import { getCustomers } from "./getAllCustomersDispatcher";

export const deleteCustomer = (
  customer: Customer,
  dispatch: Dispatch<AdminActionDispatch>
) => {
  deleteCustomerPending(dispatch);
  axios
    .delete(`${API_ENDPOINT}${CUSTOMERS_POSTFIX}/${customer.email}`, {
      headers: authHeader(),
    })
    .then((response) => {
      deleteCustomerSuccess(response.data, dispatch);
      getCustomers(dispatch);
      toastr.success(
        "Success",
        `Admin with licence number ${customer.email} has been deleted!`
      );
    })
    .catch((error) => {
      deleteCustomerFailed(dispatch);
      toastr.error("Error", "Admin offer can't be deleted.");
    });
};

const deleteCustomerSuccess = (
  customer: Customer,
  dispatch: Dispatch<AdminActionDispatch>
) => {
  dispatch({
    type: AdminActionStatuses.DELETE_CUSTOMER_SUCCESSFUL,
    payload: customer,
  });
};
const deleteCustomerPending = (dispatch: Dispatch<AdminActionDispatch>) => {
  dispatch({
    type: AdminActionStatuses.DELETE_CUSTOMER_PENDING,
    payload: {},
  });
};
const deleteCustomerFailed = (dispatch: Dispatch<AdminActionDispatch>) => {
  dispatch({
    type: AdminActionStatuses.DELETE_CUSTOMER_FAILED,
    payload: {},
  });
};
