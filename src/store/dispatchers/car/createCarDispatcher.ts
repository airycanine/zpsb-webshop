import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { CarActionDispatch } from "../../reducers/carReducer";
import { getCars } from "./getCarsDispatcher";
import authHeader from "../../../jwt/jwtHeaderGetter";
import { getActiveCars } from "./getActiveCarsDispatcher";

export const createCar = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  createCarPending(dispatch);
  axios
    .post(`${API_ENDPOINT + CARS_POSTFIX + "/"}`, car, {
      headers: authHeader(),
    })
    .then((response) => {
      createCarSuccess(response.data, dispatch);
      getActiveCars(dispatch);
      toastr.success("Success", "Car offer created!");
    })
    .catch((error) => {
      createCarFailed(dispatch);
      toastr.error("Error", "Can't create car");
    });
};

const createCarSuccess = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.CREATE_CAR_SUCCESSFUL,
    payload: car,
  });
};
const createCarPending = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.CREATE_CAR_PENDING,
    payload: {},
  });
};
const createCarFailed = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.CREATE_CAR_FAILED,
    payload: {},
  });
};
