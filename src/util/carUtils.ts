import { Car } from "../interfaces/CarInfo";

export const createLikedCarKey = (car: Car) =>
  `${car.brand}, ${car.model}, ${car.price}, ${car.currency}, ${car.seller}`;
