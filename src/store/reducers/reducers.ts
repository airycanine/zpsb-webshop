import { combineReducers, Reducer } from "redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { customerReducer } from "./customerReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { CarReducer, CarsReducer } from "../../interfaces/CarInfo";
import { carReducer } from "./carReducer";
import { carsReducer } from "./carsReducer";
import { adminReducer } from "./adminReducer";
import { AdminReducer } from "../../interfaces/AdminInfo";

export interface Reducers {
  customerReducer: CustomerReducer;
  carReducer: CarReducer;
  carsReducer: CarsReducer;
  adminReducer: AdminReducer;
  toastr: any; //@TODO resolve type
}

export const reducers: Reducer<Reducers> = combineReducers<Reducers>({
  customerReducer,
  carReducer,
  carsReducer,
  adminReducer,
  toastr: toastrReducer,
});
