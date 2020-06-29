import { Car } from "../interfaces/CarInfo";

export const mapToCarOffer = (car: Car) => {
  return {
    carInfo: car,
    featured: true,
    liked: false,
  };
};
