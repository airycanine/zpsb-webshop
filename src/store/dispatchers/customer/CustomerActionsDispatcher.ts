import { Dispatch } from "redux";
import {
  Customer,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { createCustomer } from "./createCustomerDispatcher";
import {
  loginCustomer,
  loginCustomerWithToken,
} from "./loginCustomerDispatcher";
import { logCustomerOut } from "./logoutCustomerDispatcher";
import {
  updateCustomer,
  updateCustomerAddress,
} from "./updateCustomerDispatcher";

export class CustomerActionsDispatcher {
  private readonly dispatch: Dispatch<CustomerActionDispatch>;

  constructor(dispatch: Dispatch<CustomerActionDispatch>) {
    this.dispatch = dispatch;
  }

  createCustomer = (customer: Customer, logInAfterCreation: boolean) => {
    createCustomer(customer, logInAfterCreation, this.dispatch);
  };

  updateCustomer = (customer: Customer) => {
    updateCustomer(customer, this.dispatch);
  };
  updateCustomerAddress = (customer: Customer) => {
    updateCustomerAddress(customer, this.dispatch);
  };

  logCustomerIn = (customerCredentials: CustomerCredentials) => {
    loginCustomer(customerCredentials, this.dispatch);
  };

  logCustomerInWithToken = (customer: Customer) => {
    loginCustomerWithToken(customer, this.dispatch);
  };

  logCustomerOut = () => {
    logCustomerOut(this.dispatch);
  };
}
