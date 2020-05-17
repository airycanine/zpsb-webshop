import React from "react";
import { Button } from "react-bootstrap";
import { Car, CarReducer } from "../../interfaces/CarInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import { CustomerReducer } from "../../interfaces/CustomerInfo";

interface CarBuyFormProps {
  selectedCar: Car;
}
interface PropsFromStore {
  carReducer: CarReducer;
  customerReducer: CustomerReducer;
}
const CarBuyForm = ({ selectedCar }: CarBuyFormProps) => {
  const { carReducer, customerReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        carReducer: state.carReducer,
        customerReducer: state.customerReducer,
      };
    }
  );
  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());

  return (
    <div>
      <Button
        onClick={() => {
          carActionsDispatcher.buyCar({
            ...selectedCar,
            buyer: customerReducer.customer.email,
          });
        }}
      >
        Buy
      </Button>
    </div>
  );
};

export default CarBuyForm;
