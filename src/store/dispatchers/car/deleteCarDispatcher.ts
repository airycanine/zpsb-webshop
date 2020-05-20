import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { CarActionDispatch } from "../../reducers/carReducer";
import { getCars } from "./getCarsDispatcher";
import authHeader from "../../../jwt/jwtHeaderGetter";

export const deleteCar = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  deleteCarPending(dispatch);
  axios
    .delete(`${API_ENDPOINT + CARS_POSTFIX}/${car.licenceNumber}`, {
      headers: authHeader(),
    })
    .then((response) => {
      deleteCarSuccess(response.data, dispatch);
      getCars(dispatch);
      toastr.success(
        "Success",
        `Car with licence number ${car.licenceNumber} has been deleted!`
      );
    })
    .catch((error) => {
      deleteCarFailed(dispatch);
      toastr.error("Error", "Car offer can't be deleted.");
    });
};

const deleteCarSuccess = (car: Car, dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.DELETE_CAR_SUCCESSFUL,
    payload: car,
  });
};
const deleteCarPending = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.DELETE_CAR_PENDING,
    payload: {},
  });
};
const deleteCarFailed = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.DELETE_CAR_FAILED,
    payload: {},
  });
};
