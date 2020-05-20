import { Action, Reducer } from "redux";
import {
  AdminActionDispatch,
  AdminActionStatuses,
  AdminReducer,
} from "../../interfaces/AdminInfo";
import { Customer } from "../../interfaces/CustomerInfo";

const initialState: AdminReducer = {
  customers: [],
};

export const adminReducer: Reducer<AdminReducer, AdminActionDispatch> = (
  state: AdminReducer | undefined = initialState,
  action: any
) => {
  switch (action.type) {
    case AdminActionStatuses.GET_CUSTOMERS_SUCCESSFUL: {
      return {
        ...state,
        customers: action.payload,
        lastStatus: AdminActionStatuses.GET_CUSTOMERS_SUCCESSFUL,
      };
    }
    default:
      return { ...state, lastStatus: action.type };
  }
};
