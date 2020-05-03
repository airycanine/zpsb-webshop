import React from "react";
// @ts-ignore
import Stepper from "react-stepper-horizontal";

const CustomStepper = () => (
  <Stepper
    steps={[
      { title: "Step One" },
      { title: "Step Two" },
      { title: "Step Three" },
      { title: "Step Four" },
    ]}
    activeStep={1}
  />
);

export default CustomStepper;
