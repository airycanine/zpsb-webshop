import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import CurrencyDropdown from "../components/currencyDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import { Car, CarActionStatuses, CarReducer } from "../../interfaces/CarInfo";
import "../../styles/common.css";
import "../../styles/carCreationForm.css";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { getCars } from "../../store/dispatchers/car/getCarsDispatcher";
import { getActiveCars } from "../../store/dispatchers/car/getActiveCarsDispatcher";

interface CarCreationFormProps {
  hideModal: Function;
}

interface PropsFromStore {
  carReducer: CarReducer;
  customerReducer: CustomerReducer;
}

const CarCreationForm = ({ hideModal }: CarCreationFormProps) => {
  const { carReducer, customerReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        carReducer: state.carReducer,
        customerReducer: state.customerReducer,
      };
    }
  );
  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());
  const [car, setCar] = useState<Car>({
    description: "",
    equipment: "",
    brand: "",
    offerNumber: "",
    currency: "PLN",
    images: [],
    licenceNumber: "",
    model: "",
    price: "",
    seller: customerReducer.customer.email,
    buyer: "",
    tags: [],
  });

  const [lastImageUrl, setLastImageUrl] = useState("");

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (carReducer.lastStatus === CarActionStatuses.CREATE_CAR_SUCCESSFUL) {
      carActionsDispatcher.resetCreateStatus();
      hideModal();
      setTimeout(() => carActionsDispatcher.getActiveCars(), 3000);
    }
  }, [carReducer.car]);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const images = [];
      images.push(lastImageUrl);
      carActionsDispatcher.createCar({ ...car, images });
    }
    setValidated(true);
  };

  return (
    <div className="car-creation-form">
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridModel">
            <Form.Label>Model</Form.Label>
            <Form.Control
              value={car.model}
              onChange={(event) =>
                setCar({ ...car, model: event.target.value })
              }
              type="text"
              placeholder="125p"
              required
            />
            <Form.Control.Feedback type="invalid">
              Model is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCompany">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              required
              value={car.brand}
              onChange={(event) =>
                setCar({ ...car, brand: event.target.value })
              }
              type="text"
              placeholder="Polski Fiat"
            />
            <Form.Control.Feedback type="invalid">
              Brand is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridLicence">
            <Form.Label>Licence Number</Form.Label>
            <Form.Control
              required
              value={car.licenceNumber}
              onChange={(event) =>
                setCar({ ...car, licenceNumber: event.target.value })
              }
              placeholder="ZS 12345A"
            />
            <Form.Control.Feedback type="invalid">
              Licence plate no. is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCurrency">
            <div className="mb-3"></div>
            <CurrencyDropdown
              onPriceChange={(price: number) => setCar({ ...car, price })}
              onCurrencyChange={(currency: string) =>
                setCar({ ...car, currency })
              }
            ></CurrencyDropdown>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              onChange={(event) =>
                setCar({ ...car, description: event.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEquipment">
            <Form.Label>Equipment</Form.Label>
            <Form.Control
              required
              as="textarea"
              value={car.equipment}
              onChange={(event) =>
                setCar({ ...car, equipment: event.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridImage">
            <Form.Label>Link to picture</Form.Label>
            <Form.Control
              value={lastImageUrl}
              onChange={(event) => {
                setLastImageUrl(event.target.value);
              }}
              placeholder="Url to picture"
              required
            />
          </Form.Group>
          <img
            className={"car-image"}
            width={100}
            height={100}
            src={lastImageUrl}
          ></img>
        </Form.Row>

        <div className="text-right float-right mt-4">
          <Button
            className="button-for-spinner"
            size="lg"
            variant="outline-success"
            type="submit"
          >
            {carReducer.lastStatus == CarActionStatuses.CREATE_CAR_PENDING ? (
              <Spinner animation="border" role="status"></Spinner>
            ) : (
              "Submit offer"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarCreationForm;
