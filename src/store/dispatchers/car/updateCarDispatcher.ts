import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { CarActionDispatch } from "../../reducers/carReducer";
import { getCars } from "./getCarsDispatcher";
import authHeader from "../../../jwt/jwtHeaderGetter";

export const updateCar = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  updateCarPending(dispatch);
  axios
    .put(`${API_ENDPOINT + CARS_POSTFIX}/${car.licenceNumber}`, car, {
      headers: authHeader(),
    })
    .then((response) => {
      updateCarSuccess(response.data, dispatch);
      getCars(dispatch);
      toastr.success("Success", "Car offer updated!");
    })
    .catch((error) => {
      updateCarFailed(dispatch);
      toastr.error("Error", "Car offer can't be updated.");
    });
};

const updateCarSuccess = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.UPDATE_CAR_SUCCESSFUL,
    payload: car,
  });
};
const updateCarPending = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.UPDATE_CAR_PENDING,
    payload: {},
  });
};
const updateCarFailed = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.UPDATE_CAR_FAILED,
    payload: {},
  });
};
