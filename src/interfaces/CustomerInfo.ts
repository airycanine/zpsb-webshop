export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CustomerCredentials {
  email: string;
}

export interface CustomerReducer {
  customer: Customer;
  status: CustomerActionStatuses;
  loggedIn: boolean;
}

export enum CustomerActionStatuses {
  CREATE_CUSTOMER_PENDING = "CREATE_CUSTOMER_PENDING",
  CREATE_CUSTOMER_SUCCESSFUL = "CREATE_CUSTOMER_SUCCESSFUL",
  CREATE_CUSTOMER_FAILED = "CREATE_CUSTOMER_FAILED",
  CREATE_CUSTOMER_NOT_TRIGGERED_YET = "CREATE_CUSTOMER_NOT_TRIGGERED_YET",

  GET_CUSTOMER_PENDING = "GET_CUSTOMER_PENDING",
  GET_CUSTOMER_SUCCESSFUL = "GET_CUSTOMER_SUCCESSFUL",
  GET_CUSTOMER_FAILED = "GET_CUSTOMER_FAILED",
  GET_CUSTOMER_NOT_TRIGGERED_YET = "GET_CUSTOMER_NOT_TRIGGERED_YET",
}
