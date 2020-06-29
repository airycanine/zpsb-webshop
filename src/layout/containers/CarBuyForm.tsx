import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Car, CarReducer } from "../../interfaces/CarInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import "../../styles/carBuyForm.css";

interface CarBuyFormProps {
  selectedCar: Car;
  onBuy: Function;
}
interface PropsFromStore {
  customerReducer: CustomerReducer;
}
const CarBuyForm = ({ selectedCar, onBuy }: CarBuyFormProps) => {
  const { customerReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        customerReducer: state.customerReducer,
      };
    }
  );
  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Form noValidate validated={true} onSubmit={() => {}}>
        <div className="text-center">
          <Form.Group>
            Bla bla hereby I agree to everything and want to buy{" "}
            {selectedCar.model} from{" "}
            {selectedCar.seller?.substring(0, selectedCar.seller?.indexOf("@"))}{" "}
            etc.
            <Form.Check
              required
              onChange={() => setAgreed(!agreed)}
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button
            size="lg"
            className="col-md-2 h button-for-spinner"
            variant="success"
            onClick={() => {
              if (agreed) {
                carActionsDispatcher.buyCar({
                  ...selectedCar,
                  buyer: customerReducer.customer.email,
                });
                onBuy();
              }
            }}
          >
            Buy car
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CarBuyForm;
