import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Car } from "../../interfaces/CarInfo";
import NotFoundPage from "../components/notFoundPage";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioProps,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { OffersGroups } from "../../consts/OffersGroups";

interface PropsFromStore {
  loggedIn: boolean;
  boughtCars: Car[];
  soldCars: Car[];
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

const CustomerOffers = () => {
  const { boughtCars, soldCars, loggedIn } = useSelector<
    Reducers,
    PropsFromStore
  >((state: Reducers) => {
    return {
      loggedIn: state.customerReducer.loggedIn,
      boughtCars: state.carsReducer.cars.filter(
        (car) => car.buyer === state.customerReducer.customer.email
      ),
      soldCars: state.carsReducer.cars.filter(
        (car) => car.seller === state.customerReducer.customer.email
      ),
    };
  });

  const [shownOffers, setShownOffers] = useState(OffersGroups.BOUGHT_CARS);

  const userActionsDispatcher = new CustomerActionsDispatcher(useDispatch());

  return loggedIn ? (
    <div className={"text-center mt-5"}>
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
              <Radio
                onChange={() => {
                  setShownOffers(OffersGroups.BOUGHT_CARS);
                }}
                color="primary"
              />
            }
            label="Bought cars"
            labelPlacement="top"
          />

          <FormControlLabel
            value="bottom"
            control={
              <GreenRadio
                onChange={() => {
                  setShownOffers(OffersGroups.SOLD_CARS);
                }}
                value={true}
                color="primary"
              />
            }
            label="Sold cars"
            labelPlacement="bottom"
          />
        </RadioGroup>
        {shownOffers}
      </FormControl>
    </div>
  ) : (
    <NotFoundPage />
  );
};

export default CustomerOffers;
