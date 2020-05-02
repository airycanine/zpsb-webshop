import { createStore } from "redux";
import { reducers, Reducers } from "./reducers/reducers";

export const store = createStore(reducers);
