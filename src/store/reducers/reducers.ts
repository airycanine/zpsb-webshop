import { combineReducers, Reducer } from "redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { customerReducer } from "./customerReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { CarReducer, CarsReducer } from "../../interfaces/CarInfo";
import { carReducer } from "./carReducer";
import { carsReducer } from "./carsReducer";
import { adminReducer } from "./adminReducer";
import { AdminReducer } from "../../interfaces/AdminInfo";
import { TagsReducer } from "../../interfaces/TagsInfo";
import { tagsReducer } from "./tagsReducer";

export interface Reducers {
  customerReducer: CustomerReducer;
  carReducer: CarReducer;
  carsReducer: CarsReducer;
  adminReducer: AdminReducer;
  tagsReducer: TagsReducer;
  toastr: any; //@TODO resolve type
}

export const reducers: Reducer<Reducers> = combineReducers<Reducers>({
  customerReducer,
  carReducer,
  carsReducer,
  adminReducer,
  tagsReducer,
  toastr: toastrReducer,
});
