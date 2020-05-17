import { Action, Reducer } from "redux";
import {
  Customer,
  CustomerActionStatuses,
  CustomerReducer,
} from "../../interfaces/CustomerInfo";

export interface CustomerActionDispatch extends Action<CustomerActionStatuses> {
  payload: Partial<Customer>;
}

const initialState: CustomerReducer = {
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    offers: [],
    likedCars: [],
  },
  lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_NOT_TRIGGERED_YET,
  loggedIn: false,
};

export const customerReducer: Reducer<
  CustomerReducer,
  CustomerActionDispatch
> = (state: CustomerReducer | undefined = initialState, action: any) => {
  switch (action.type) {
    case CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: action.payload,
        lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
      };
    case CustomerActionStatuses.GET_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: action.payload,
        loggedIn: true,
        lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_SUCCESSFUL,
      };

    case CustomerActionStatuses.LOG_CUSTOMER_OUT:
      return {
        ...state,
        loggedIn: false,
        lastStatus: action.type,
      };

    case CustomerActionStatuses.UPDATE_CUSTOMER_SUCCESSFUL: {
      return {
        ...state,
        customer: action.payload,
        loggedIn: true,
        lastStatus: CustomerActionStatuses.UPDATE_CUSTOMER_SUCCESSFUL,
      };
    }
    default:
      return { ...state, lastStatus: action.type };
  }
};
