import { combineReducers, Reducer } from "redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { customerReducer } from "./customerReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { CarReducer } from "../../interfaces/CarInfo";
import { carReducer } from "./carReducer";

export interface Reducers {
  customerReducer: CustomerReducer;
  carReducer: CarReducer;
  toastr: any; //@TODO resolve type
}

export const reducers: Reducer<Reducers> = combineReducers<Reducers>({
  customerReducer,
  carReducer,
  toastr: toastrReducer,
});
