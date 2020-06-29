export interface Car {
  offerNumber: string;
  licenceNumber: string;
  model: string;
  brand: string;
  equipment: string;
  description: string;
  currency: string;
  images: any[];
  tags: string[];
  price: number | "";
  seller: string | undefined;
  buyer: string | undefined;
}

export enum CarActionStatuses {
  CREATE_CAR_PENDING = "CREATE_CAR_PENDING",
  CREATE_CAR_SUCCESSFUL = "CREATE_CAR_SUCCESSFUL",
  CREATE_CAR_FAILED = "CREATE_CAR_FAILED",
  CREATE_CAR_NOT_TRIGGERED_YET = "CREATE_CAR_NOT_TRIGGERED_YET",
  DELETE_CAR_PENDING = "DELETE_CAR_PENDING",
  DELETE_CAR_SUCCESSFUL = "DELETE_CAR_SUCCESSFUL",
  DELETE_CAR_FAILED = "DELETE_CAR_FAILED",
  DELETE_CAR_NOT_TRIGGERED_YET = "DELETE_CAR_NOT_TRIGGERED_YET",
  UPDATE_CAR_PENDING = "UPDATE_CAR_PENDING",
  UPDATE_CAR_SUCCESSFUL = "UPDATE_CAR_SUCCESSFUL",
  UPDATE_CAR_FAILED = "UPDATE_CAR_FAILED",
  UPDATE_CAR_NOT_TRIGGERED_YET = "UPDATE_CAR_NOT_TRIGGERED_YET",
  BUY_CAR_PENDING = "BUY_CAR_PENDING",
  BUY_CAR_SUCCESSFUL = "BUY_CAR_SUCCESSFUL",
  BUY_CAR_FAILED = "BUY_CAR_FAILED",
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
}
