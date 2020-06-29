import { Action, Reducer } from "redux";
import { Car, CarActionStatuses, CarReducer } from "../../interfaces/CarInfo";

export interface CarActionDispatch extends Action<CarActionStatuses> {
  payload: Partial<Car> | Partial<Car[]>;
}

const initialState: CarReducer = {
  car: {
    licenceNumber: "",
    model: "",
    description: "",
    equipment: "",
    offerNumber: "",
    brand: "",
    currency: "",
    images: [],
    tags: [],
    price: "",
    seller: "",
    buyer: "",
  },
  lastStatus: CarActionStatuses.CREATE_CAR_NOT_TRIGGERED_YET,
};

export const carReducer: Reducer<CarReducer, CarActionDispatch> = (
  state: CarReducer | undefined = initialState,
  action: any
) => {
  switch (action.type) {
    case CarActionStatuses.CREATE_CAR_SUCCESSFUL:
      return {
        ...state,
        car: action.payload,
        lastStatus: CarActionStatuses.CREATE_CAR_SUCCESSFUL,
      };
    case CarActionStatuses.UPDATE_CAR_SUCCESSFUL:
      return {
        ...state,
        car: action.payload,
        lastStatus: CarActionStatuses.UPDATE_CAR_SUCCESSFUL,
      };

    default:
      return { ...state, lastStatus: action.type };
  }
};
