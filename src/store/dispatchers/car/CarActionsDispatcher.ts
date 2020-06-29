import { Dispatch } from "redux";
import { CarActionDispatch } from "../../reducers/carReducer";
import { createCar } from "./createCarDispatcher";
import { Car, CarActionStatuses } from "../../../interfaces/CarInfo";
import { getCars } from "./getCarsDispatcher";
import { updateCar } from "./updateCarDispatcher";
import { buyCar } from "./buyCarDispatcher";
import { deleteCar } from "./deleteCarDispatcher";
import { getActiveCars } from "./getActiveCarsDispatcher";
import { getActiveCarsAscendingByPrice } from "./getActiveCarsAscendingByPrice";
import { getActiveCarsDescendingByPrice } from "./getActiveCarsDescendingByPrice";

export class CarActionsDispatcher {
  private readonly dispatch: Dispatch<CarActionDispatch>;

  constructor(dispatch: Dispatch<CarActionDispatch>) {
    this.dispatch = dispatch;
  }

  createCar = (car: Car) => createCar(car, this.dispatch);

  updateCar = (car: Car) => updateCar(car, this.dispatch);

  buyCar = (car: Car) => buyCar(car, this.dispatch);

  getCars = () => getCars(this.dispatch);

  getActiveCars = () => getActiveCars(this.dispatch);

  getCarsAscendingByPrice = () => getActiveCarsAscendingByPrice(this.dispatch);

  getCarsDescendingByPrice = () =>
    getActiveCarsDescendingByPrice(this.dispatch);

  deleteCar = (car: Car) => deleteCar(car, this.dispatch);

  resetCreateStatus = () => {
    this.dispatch({
      type: CarActionStatuses.CREATE_CAR_NOT_TRIGGERED_YET,
      payload: {},
    });
  };
}
