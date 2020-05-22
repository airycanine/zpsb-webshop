export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  password: string;
  offers: string[];
  likedCars: string[];
}

export interface Address {
  city: string;
  street: string;
  voivodeship: string;
  zip: string;
}

export interface CustomerCredentials {
  email: string;
  password: string;
}

export interface CustomerReducer {
  customer: Customer;
  lastStatus: CustomerActionStatuses;
  loggedIn: boolean;
  roles: string[];
}

export enum CustomerActionStatuses {
  CREATE_CUSTOMER_PENDING = "CREATE_CUSTOMER_PENDING",
  REGISTER_CUSTOMER = "REGISTER_CUSTOMER",
  CREATE_CUSTOMER_FAILED = "CREATE_CUSTOMER_FAILED",
  CREATE_CUSTOMER_NOT_TRIGGERED_YET = "CREATE_CUSTOMER_NOT_TRIGGERED_YET",
  UPDATE_CUSTOMER_PENDING = "UPDATE_CUSTOMER_PENDING",
  UPDATE_CUSTOMER_SUCCESSFUL = "UPDATE_CUSTOMER_SUCCESSFUL",
  UPDATE_CUSTOMER_FAILED = "UPDATE_CUSTOMER_FAILED",
  UPDATE_CUSTOMER_NOT_TRIGGERED_YET = "UPDATE_CUSTOMER_NOT_TRIGGERED_YET",

  GET_CUSTOMER_PENDING = "GET_CUSTOMER_PENDING",
  LOG_CUSTOMER_IN = "LOG_CUSTOMER_IN",
  GET_CUSTOMER_FAILED = "GET_CUSTOMER_FAILED",
  GET_CUSTOMER_NOT_TRIGGERED_YET = "GET_CUSTOMER_NOT_TRIGGERED_YET",

  LOG_CUSTOMER_OUT = "LOG_CUSTOMER_OUT",
}
