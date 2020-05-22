import { Action } from "redux";
import { Car, CarActionStatuses } from "./CarInfo";
import { Customer, CustomerActionStatuses } from "./CustomerInfo";

export enum AdminActionStatuses {
  GET_CUSTOMER_PENDING = "GET_CUSTOMERS_PENDING",
  GET_CUSTOMERS_SUCCESSFUL = "GET_CUSTOMERS_SUCCESSFUL",
  GET_CUSTOMERS_FAILED = "GET_CUSTOMERS_FAILED",
  GET_CUSTOMERS_NOT_TRIGGERED_YET = "GET_CUSTOMERS_NOT_TRIGGERED_YET",
  DELETE_CUSTOMER_PENDING = "DELETE_CUSTOMER_PENDING",
  DELETE_CUSTOMER_SUCCESSFUL = "DELETE_CUSTOMER_SUCCESSFUL",
  DELETE_CUSTOMER_FAILED = "DELETE_CUSTOMER_FAILED",
  DELETE_CUSTOMER_NOT_TRIGGERED_YET = "DELETE_CUSTOMER_NOT_TRIGGERED_YET",
}

export interface AdminActionDispatch extends Action<AdminActionStatuses> {
  payload: Partial<Customer> | Partial<Customer[]>;
}

export interface AdminReducer {
  customers: Customer[];
}
