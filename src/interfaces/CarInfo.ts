export interface Car {
  licenceNumber: string;
  model: string;
  brand: string;
  currency: string;
  images: any[];
  price: number | "";
  author: string | undefined;
}

export enum CarActionStatuses {
  CREATE_CAR_PENDING = "CREATE_CAR_PENDING",
  CREATE_CAR_SUCCESSFUL = "CREATE_CAR_SUCCESSFUL",
  CREATE_CAR_FAILED = "CREATE_CAR_FAILED",
  CREATE_CAR_NOT_TRIGGERED_YET = "CREATE_CAR_NOT_TRIGGERED_YET",
  GET_CARS_PENDING = "GET_CARS_PENDING",
  GET_CARS_SUCCESSFUL = "GET_CARS_SUCCESSFUL",
  GET_CARS_FAILED = "GET_CARS_FAILED",
  GET_CARS_NOT_TRIGGERED_YET = "GET_CARS_NOT_TRIGGERED_YET",
}

export interface CarReducer {
  car: Car;
  lastStatus: CarActionStatuses;
}

export interface CarsReducer {
  cars: Car[];
  lastStatus: CarActionStatuses;
}

export interface CarOffer {
  carInfo: Car;
  featured: boolean;
  liked: boolean;
}
