import React from "react";
import { Button } from "react-bootstrap";
import { Car } from "../../interfaces/CarInfo";

const CarBuyForm = (selectedCar: Car) => {
  return (
    <>
      <div>Model: {selectedCar.model}</div>
      <div>Brand: {selectedCar.brand}</div>
      <div>
        Price: {selectedCar.price} {selectedCar.currency}
      </div>
      <div>Seller: {selectedCar.seller}</div>
      <div className="text-right float-right mt-2">
        <Button
          onClick={() => {
            // hideModal();
          }}
          size="lg"
          variant="outline-success"
          type="submit"
        >
          Buy
        </Button>
      </div>
    </>
  );
};

export default CarBuyForm;
