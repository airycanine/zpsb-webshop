import { Dispatch } from "redux";
import { AdminActionDispatch } from "../../../interfaces/AdminInfo";
import { getCustomers } from "./getAllCustomersDispatcher";
import { Customer } from "../../../interfaces/CustomerInfo";
import { deleteCustomer } from "./deleteCustomerDispatcher";

export class AdminActionsDispatcher {
  private readonly dispatch: Dispatch<AdminActionDispatch>;

  constructor(dispatch: Dispatch<AdminActionDispatch>) {
    this.dispatch = dispatch;
  }

  getCustomers = () => getCustomers(this.dispatch);
  deleteCustomer = (customer: Customer) =>
    deleteCustomer(customer, this.dispatch);
}
