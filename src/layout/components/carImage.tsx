import React, { useState } from "react";
import { Car } from "../../interfaces/CarInfo";
import "../../styles/carOffersList.css";

const CarImage = (car: any) => {
  const [image, setImage] = useState("../../resources/Nocar.svg.png");
  return (
    <>
      <div className="bg-image">
        <img
          src={image}
          alt={car.model}
          onError={(error) => {
            console.log(error);
            setImage("../../resources/Nocar.svg.png");
          }}
        />
      </div>
      <div className="bg-text">
        <h1>Offer sold</h1>
        <p>cheers</p>
      </div>
    </>
  );
};

export default CarImage;
