import { Dispatch } from "redux";
import { Customer } from "../../../interfaces/CustomerInfo";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { createCustomer } from "./createCustomerDispatcher";

export class CustomerActionsDispatcher {
  private readonly dispatch: Dispatch<CustomerActionDispatch>;

  constructor(dispatch: Dispatch<CustomerActionDispatch>) {
    this.dispatch = dispatch;
  }

  createCustomer = (customer: Customer, logInAfterCreation: boolean) => {
    createCustomer(customer, logInAfterCreation, this.dispatch);
  };
}
