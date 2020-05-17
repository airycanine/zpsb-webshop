import React, { useState } from "react";
import { Car } from "../../interfaces/CarInfo";
import CustomizableStepper from "./customizableStepper";
import CarInfoCard from "./carInfoCard";
import CustomerCreationForm from "../containers/CustomerCreationForm";
import CarBuyForm from "../containers/CarBuyForm";

interface CarBuyStepperProps {
  selectedCar: Car;
}

const CarBuyStepper = ({ selectedCar }: CarBuyStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CarInfoCard selectedCar={selectedCar}></CarInfoCard>;
      case 1:
        return (
          <CustomerCreationForm
            onRegisterSuccess={() => setActiveStep(activeStep + 1)}
          />
        );
      case 2:
        return <CarBuyForm selectedCar={selectedCar} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <CustomizableStepper
      steps={["Car info", "Register", "Buy car"]}
      getStepContent={getStepContent}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    ></CustomizableStepper>
  );
};

export default CarBuyStepper;
