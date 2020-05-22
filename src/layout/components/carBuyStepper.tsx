import React, { useState } from "react";
import { Car, CarReducer } from "../../interfaces/CarInfo";
import CustomizableStepper from "./customizableStepper";
import CarInfoCard from "./carInfoCard";
import CustomerRegistrationForm from "../containers/CustomerRegistrationForm";
import CarBuyForm from "../containers/CarBuyForm";
import { useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { toastr } from "react-redux-toastr";

interface CarBuyStepperProps {
  selectedCar: Car;
  onBuy: Function;
}

interface PropsFromStore {
  loggedIn: boolean;
}

const CarBuyStepper = ({ selectedCar, onBuy }: CarBuyStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { loggedIn } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        loggedIn: state.customerReducer.loggedIn,
      };
    }
  );
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CarInfoCard selectedCar={selectedCar}></CarInfoCard>;
      case 1:
        return (
          <CustomerRegistrationForm
            onRegisterSuccess={() => setActiveStep(activeStep + 1)}
          />
        );
      case 2:
        return <CarBuyForm onBuy={onBuy} selectedCar={selectedCar} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <CustomizableStepper
      steps={["Car info", "Register", "Buy car"]}
      getStepContent={getStepContent}
      activeStep={activeStep}
      loggedIn={loggedIn}
      setActiveStep={setActiveStep}
    ></CustomizableStepper>
  );
};

export default CarBuyStepper;
