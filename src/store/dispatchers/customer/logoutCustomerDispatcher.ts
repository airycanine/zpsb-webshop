import { CustomerActionStatuses } from "../../../interfaces/CustomerInfo";
import { Dispatch } from "redux";
import { CustomerActionDispatch } from "../../reducers/customerReducer";

export const logCustomerOut = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.LOG_CUSTOMER_OUT,
    payload: {},
  });
};
