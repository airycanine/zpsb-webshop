import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { CarActionDispatch } from "../../reducers/carReducer";

export const getActiveCarsAscendingByPrice = (
  dispatch: Dispatch<CarActionDispatch>
) => {
  getCarsPending(dispatch);
  axios
    .get(`${API_ENDPOINT + CARS_POSTFIX}/active/ascending`)
    .then((response) => {
      getCarsSuccess(response.data, dispatch);
    })
    .catch((error) => {
      getCarsFailed(dispatch);
      toastr.error("Error", "Cars can't be fetched.");
    });
};

const getCarsPending = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.GET_CARS_PENDING,
    payload: {},
  });
};

const getCarsSuccess = (cars: Car[], dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.GET_CARS_SUCCESSFUL,
    payload: cars,
  });
};
const getCarsFailed = (dispatch: Dispatch<CarActionDispatch>) => {
  dispatch({
    type: CarActionStatuses.GET_CARS_FAILED,
    payload: {},
  });
};
