import { Dispatch } from "redux";
import {
  Customer,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { createCustomer } from "./createCustomerDispatcher";
import { getCustomer } from "./getCustomerDispatcher";
import { logCustomerOut } from "./logoutCustomerDispatcher";
import { updateCustomer } from "./updateCustomerDispatcher";

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

  logCustomerIn = (customerCredentials: CustomerCredentials) => {
    getCustomer(customerCredentials, this.dispatch);
  };

  logCustomerOut = () => {
    logCustomerOut(this.dispatch);
  };
}
