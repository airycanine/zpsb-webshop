import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import {
  AdminActionDispatch,
  AdminActionStatuses,
} from "../../../interfaces/AdminInfo";
import { Customer } from "../../../interfaces/CustomerInfo";
import authHeader from "../../../jwt/jwtHeaderGetter";

export const getCustomers = (dispatch: Dispatch<AdminActionDispatch>) => {
  getCustomersPending(dispatch);
  axios
    .get(`${API_ENDPOINT}${CUSTOMERS_POSTFIX}`, { headers: authHeader() })
    .then((response) => {
      getCustomersSuccess(response.data, dispatch);
    })
    .catch((error) => {
      getCustomersFailed(dispatch);
      toastr.error("Error", "Customers can't be fetched.");
    });
};

const getCustomersPending = (dispatch: Dispatch<AdminActionDispatch>) => {
  dispatch({
    type: AdminActionStatuses.GET_CUSTOMER_PENDING,
    payload: {},
  });
};

const getCustomersSuccess = (
  customers: Customer[],
  dispatch: Dispatch<AdminActionDispatch>
) => {
  dispatch({
    type: AdminActionStatuses.GET_CUSTOMERS_SUCCESSFUL,
    payload: customers,
  });
};
const getCustomersFailed = (dispatch: Dispatch<AdminActionDispatch>) => {
  dispatch({
    type: AdminActionStatuses.GET_CUSTOMERS_FAILED,
    payload: {},
  });
};
