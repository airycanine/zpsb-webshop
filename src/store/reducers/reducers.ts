import { combineReducers, Reducer } from "redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { customerReducer } from "./customerReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

export interface Reducers {
  customerReducer: CustomerReducer;
  toastr: any; //@TODO resolve type
}

export const reducers: Reducer<Reducers> = combineReducers<Reducers>({
  customerReducer,
  toastr: toastrReducer,
});
