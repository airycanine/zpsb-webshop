export interface Car {
  licenceNumber: string;
  model: string;
  brand: string;
  currency: string;
  images: any[];
  price: number | "";
}

export enum CarActionStatuses {
  CREATE_CAR_PENDING = "CREATE_CAR_PENDING",
  CREATE_CAR_SUCCESSFUL = "CREATE_CAR_SUCCESSFUL",
  CREATE_CAR_FAILED = "CREATE_CAR_FAILED",
  CREATE_CAR_NOT_TRIGGERED_YET = "CREATE_CAR_NOT_TRIGGERED_YET",
}

export interface CarReducer {
  car: Car;
  lastStatus: CarActionStatuses;
}
