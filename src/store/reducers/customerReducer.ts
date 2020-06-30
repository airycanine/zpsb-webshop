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
    password: "",
    address: {
      city: "",
      street: "",
      zip: "",
      voivodeship: "Zachodniopomorskie",
    },
    offers: [],
    likedCars: [],
  },
  lastStatus: CustomerActionStatuses.CREATE_CUSTOMER_NOT_TRIGGERED_YET,
  loggedIn: false,
  roles: [],
};

export const customerReducer: Reducer<
  CustomerReducer,
  CustomerActionDispatch
> = (state: CustomerReducer | undefined = initialState, action: any) => {
  switch (action.type) {
    case CustomerActionStatuses.REGISTER_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        lastStatus: CustomerActionStatuses.REGISTER_CUSTOMER,
      };
    case CustomerActionStatuses.LOG_CUSTOMER_IN:
      return {
        ...state,
        customer: action.payload,
        loggedIn: true,
        lastStatus: CustomerActionStatuses.LOG_CUSTOMER_IN,
        roles: action.payload.roles,
      };

    case CustomerActionStatuses.LOG_CUSTOMER_OUT:
      return {
        ...state,
        loggedIn: false,
        lastStatus: action.type,
        customer: { ...initialState.customer },
      };

    case CustomerActionStatuses.UPDATE_CUSTOMER_SUCCESSFUL: {
      return {
        ...state,
        customer: action.payload,
        loggedIn: true,
        lastStatus: CustomerActionStatuses.UPDATE_CUSTOMER_SUCCESSFUL,
      };
    }
    case CustomerActionStatuses.UPDATE_CUSTOMER_ADDRESS_SUCCESSFUL: {
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
