import { compose, createStore } from "redux";
import { reducers, Reducers } from "./reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(reducers, composeWithDevTools());
