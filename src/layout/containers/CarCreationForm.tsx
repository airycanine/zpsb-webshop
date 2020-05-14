import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import CurrencyDropdown from "../components/currencyDropdown";
import MultipleImagesUploader from "../components/imageUploader";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import { Car, CarActionStatuses, CarReducer } from "../../interfaces/CarInfo";
import "../../styles/common.css";

interface CarCreationFormProps {
  hideModal: Function;
}

interface PropsFromStore {
  carReducer: CarReducer;
}

const CarCreationForm = ({ hideModal }: CarCreationFormProps) => {
  const { carReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        carReducer: state.carReducer,
      };
    }
  );
  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());
  const [car, setCar] = useState<Car>({
    brand: "",
    currency: "",
    images: [],
    licenceNumber: "",
    model: "",
    price: "",
    author: "",
  });

  const [lastImageUrl, setLastImageUrl] = useState("");

  useEffect(() => {
    if (carReducer.lastStatus === CarActionStatuses.CREATE_CAR_SUCCESSFUL) {
      carActionsDispatcher.resetCreateStatus();
      hideModal();
    }
  }, [carReducer.car]);

  return (
    <div className="car-creation-form">
      <Form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          const images = [];
          images.push(lastImageUrl);
          carActionsDispatcher.createCar({ ...car, images });
        }}
      >
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
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCompany">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={car.brand}
              onChange={(event) =>
                setCar({ ...car, brand: event.target.value })
              }
              type="text"
              placeholder="Polski Fiat"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridLicence">
            <Form.Label>Licence Number</Form.Label>
            <Form.Control
              value={car.licenceNumber}
              onChange={(event) =>
                setCar({ ...car, licenceNumber: event.target.value })
              }
              placeholder="ZS 12345A"
            />
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
          <Form.Group as={Col} controlId="formGridImage">
            <Form.Label>Link to picture</Form.Label>
            <Form.Control
              value={lastImageUrl}
              onChange={(event) => setLastImageUrl(event.target.value)}
              placeholder="Url to picture"
            />
          </Form.Group>
        </Form.Row>

        <MultipleImagesUploader
          onUpload={(image: any) =>
            setCar({ ...car, images: [...car.images, image] })
          }
        ></MultipleImagesUploader>
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
