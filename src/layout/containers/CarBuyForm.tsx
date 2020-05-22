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
}
interface PropsFromStore {
  carReducer: CarReducer;
  customerReducer: CustomerReducer;
}
const CarBuyForm = ({ selectedCar }: CarBuyFormProps) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
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
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button
            size="lg"
            className="col-md-2 h button-for-spinner"
            variant="success"
            onClick={() => {
              carActionsDispatcher.buyCar({
                ...selectedCar,
                buyer: customerReducer.customer.email,
              });
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
