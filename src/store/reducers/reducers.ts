import { combineReducers, Reducer } from "redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { customerReducer } from "./customerReducer";

export interface Reducers {
  customerReducer: CustomerReducer;
}

export const reducers: Reducer<Reducers> = combineReducers<Reducers>({
  customerReducer,
});
