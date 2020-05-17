import React from "react";
import { Car } from "../../interfaces/CarInfo";

interface CarInfoCardProps {
  selectedCar: Car;
}

const CarInfoCard = ({ selectedCar }: CarInfoCardProps) => {
  return (
    <div className={"text-center"}>
      <div>Model: {selectedCar.model}</div>
      <div>Brand: {selectedCar.brand}</div>
      <div>
        Price: {selectedCar.price} {selectedCar.currency}
      </div>
      <div>Seller: {selectedCar.seller}</div>
    </div>
  );
};

export default CarInfoCard;
