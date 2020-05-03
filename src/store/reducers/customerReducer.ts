import { Action, Reducer } from "redux";
import {
  Customer,
  CustomerActionStatuses,
  CustomerReducer,
} from "../../interfaces/CustomerInfo";

export interface DispatchAction extends Action<CustomerActionStatuses> {
  payload: Partial<Customer>;
}

const initialState: CustomerReducer = {
  customer: { firstName: "", lastName: "", email: "" },
  lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_NOT_TRIGGERED_YET,
  loggedIn: false,
};

export const customerReducer: Reducer<CustomerReducer, DispatchAction> = (
  state: CustomerReducer | undefined = initialState,
  action: any
) => {
  switch (action.type) {
    case CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: action.payload,
        lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
      };
    default:
      return { ...state, lastStatus: action.type };
  }
};
