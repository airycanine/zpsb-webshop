import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Car } from "../../interfaces/CarInfo";
import NotFoundPage from "../components/notFoundPage";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioProps,
  withStyles,
} from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";
import { OffersGroups } from "../../consts/OffersGroups";
import "../../styles/accountOffers.css";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import CarCardStepper from "../components/carCardStepper";

interface PropsFromStore {
  loggedIn: boolean;
  boughtCars: Car[];
  soldCars: Car[];
  activeOffers: Car[];
}

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const CustomerOffers = () => {
  const { activeOffers, boughtCars, soldCars, loggedIn } = useSelector<
    Reducers,
    PropsFromStore
  >((state: Reducers) => {
    return {
      loggedIn: state.customerReducer.loggedIn,
      boughtCars: state.carsReducer.cars.filter(
        (car) => car.buyer === state.customerReducer.customer.email
      ),
      soldCars: state.carsReducer.cars.filter(
        (car) =>
          car.seller === state.customerReducer.customer.email &&
          car.buyer !== ""
      ),
      activeOffers: state.carsReducer.cars.filter(
        (car) =>
          car.seller === state.customerReducer.customer.email && car.buyer == ""
      ),
    };
  });

  const [shownOffers, setShownOffers] = useState(OffersGroups.ACTIVE);

  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());

  const renderOffers = () => {
    switch (shownOffers) {
      case OffersGroups.ACTIVE: {
        return activeOffers.length != 0 ? (
          <CarCardStepper cars={activeOffers} />
        ) : (
          ""
        );
      }
      case OffersGroups.SOLD_CARS: {
        return soldCars.length != 0 ? (
          <CarCardStepper cars={soldCars}></CarCardStepper>
        ) : (
          ""
        );
      }
      case OffersGroups.BOUGHT_CARS: {
        return boughtCars.length != 0 ? (
          <CarCardStepper cars={boughtCars}></CarCardStepper>
        ) : (
          ""
        );
      }
    }
  };

  useEffect(() => {
    carActionsDispatcher.getCars();
  }, []);

  return loggedIn ? (
    <div className={"text-center mt-5 account-offers"}>
      <h1>My offers</h1>

      <FormControl component="fieldset" className={"mt-4"}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="top"
            control={
              <OrangeRadio
                onChange={() => {
                  setShownOffers(OffersGroups.ACTIVE);
                }}
                color="primary"
              />
            }
            label="Active offers"
            labelPlacement="bottom"
            className={"active-offers"}
          />
          <FormControlLabel
            value="bought-cars"
            control={
              <Radio
                onChange={() => {
                  setShownOffers(OffersGroups.BOUGHT_CARS);
                }}
                color="primary"
              />
            }
            label="Bought cars"
            labelPlacement="top"
            className={"bought-cars"}
          />
          <FormControlLabel
            value="sold-cars"
            control={
              <GreenRadio
                onChange={() => {
                  setShownOffers(OffersGroups.SOLD_CARS);
                }}
                color="primary"
              />
            }
            label="Sold cars"
            labelPlacement="bottom"
            className={"sold-cars"}
          />
        </RadioGroup>
        {renderOffers()}
      </FormControl>
    </div>
  ) : (
    <NotFoundPage />
  );
};

export default CustomerOffers;
