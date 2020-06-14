import { Action, Reducer } from "redux";
import {
  Car,
  CarActionStatuses,
  CarReducer,
  CarsReducer,
} from "../../interfaces/CarInfo";

export interface CarActionDispatch extends Action<CarActionStatuses> {
  payload: Partial<Car> | Partial<Car[]>;
}

const initialState: CarsReducer = {
  cars: [
    {
      offerNumber: "",
      licenceNumber: "",
      model: "",
      brand: "",
      currency: "",
      images: [],
      price: "",
      seller: "",
      buyer: "",
    },
  ],
  lastStatus: CarActionStatuses.GET_CARS_NOT_TRIGGERED_YET,
};

export const carsReducer: Reducer<CarsReducer, CarActionDispatch> = (
  state: CarsReducer | undefined = initialState,
  action: any
) => {
  switch (action.type) {
    case CarActionStatuses.GET_CARS_SUCCESSFUL: {
      return {
        ...state,
        cars: action.payload,
        lastStatus: CarActionStatuses.GET_CARS_SUCCESSFUL,
      };
    }
    default:
      return { ...state, lastStatus: action.type };
  }
};
