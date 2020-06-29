import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { CarActionDispatch } from "../../reducers/carReducer";
import { getCars } from "./getCarsDispatcher";
import authHeader from "../../../jwt/jwtHeaderGetter";
import { getActiveCars } from "./getActiveCarsDispatcher";

export const buyCar = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  buyCarPending(dispatch);
  axios
    .put(`${API_ENDPOINT + CARS_POSTFIX}/${car.offerNumber}`, car, {
      headers: authHeader(),
    })
    .then((response) => {
      buyCarSuccess(response.data, dispatch);
      getActiveCars(dispatch);
      toastr.success("Success", "Car offer bought!");
    })
    .catch((error) => {
      buyCarFailed(dispatch);
      toastr.error("Error", "Car offer can't be bought.");
    });
};

const buyCarSuccess = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.BUY_CAR_SUCCESSFUL,
    payload: car,
  });
};
const buyCarPending = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.BUY_CAR_PENDING,
    payload: {},
  });
};
const buyCarFailed = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.BUY_CAR_FAILED,
    payload: {},
  });
};
