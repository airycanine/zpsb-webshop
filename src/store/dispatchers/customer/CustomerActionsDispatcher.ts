import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { DispatchAction } from "../../reducers/customerReducer";
import { createCustomer } from "./createCustomerDispatcher";
import { getCustomer } from "./getCustomerDispatcher";

export class CustomerActionsDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  createCustomer = async (customer: Customer, logInAfterCreation: boolean) => {
    await createCustomer(customer, logInAfterCreation, this.dispatch);
  };
}
