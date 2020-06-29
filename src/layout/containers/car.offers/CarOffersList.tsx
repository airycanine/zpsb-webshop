import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../../store/dispatchers/car/CarActionsDispatcher";
import {
  Car,
  CarActionStatuses,
  CarOffer,
  CarsReducer,
} from "../../../interfaces/CarInfo";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../../styles/carOffersList.css";
import { useStyles } from "../../../styles/imageGridList";
import axios from "axios";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import VerticallyCenteredModal from "../../components/verticallyCenteredModal";
import { Customer } from "../../../interfaces/CustomerInfo";
import { CustomerActionsDispatcher } from "../../../store/dispatchers/customer/CustomerActionsDispatcher";
import { toastr } from "react-redux-toastr";
import CarBuyStepper from "../../components/carBuyStepper";
import CustomPagination from "../../components/customPagination";
import CarCard from "./CarCard";
import { Autocomplete } from "@material-ui/lab";
import { Row } from "react-bootstrap";
import Tags from "../../components/tags";
import { getActiveCars } from "../../../store/dispatchers/car/getActiveCarsDispatcher";
import { getActiveCarsDescendingByPrice } from "../../../store/dispatchers/car/getActiveCarsDescendingByPrice";
import { API_ENDPOINT, CARS_POSTFIX } from "../../../consts/endpoints";
import { mapToCarOffer } from "../../../util/carMapper";

interface PropsFromStore {
  carsReducer: CarsReducer;
  customer: Customer;
  loggedIn: boolean;
}
const CarOffersList = () => {
  const classes = useStyles();

  const { carsReducer, customer, loggedIn } = useSelector<
    Reducers,
    PropsFromStore
  >((state: Reducers) => {
    return {
      carsReducer: state.carsReducer,
      customer: state.customerReducer.customer,
      loggedIn: state.customerReducer.loggedIn,
    };
  });

  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());

  const customerActionsDispatcher = new CustomerActionsDispatcher(
    useDispatch()
  );

  const [backdropOpened, setBackdropOpened] = useState(true);

  const [carOffers, setCarOffers] = useState<CarOffer[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  const [allTags, setAllTags] = useState<string[]>([]);

  const [modalShown, setModalShown] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [offersPerPage] = useState(2);

  const [totalPages, setTotalPages] = useState<number>();

  const [selectedCarOffer, setSelectedCarOffer] = useState<CarOffer>(
    carOffers[0]
  );

  const [filterMode, setFilterMode] = useState("all");

  useEffect(() => {
    switch (filterMode) {
      case "all": {
        carActionsDispatcher.getActiveCars();
        break;
      }
      case "ascending": {
        carActionsDispatcher.getCarsAscendingByPrice();
        break;
      }
      case "descending": {
        carActionsDispatcher.getCarsDescendingByPrice();
        break;
      }
      default: {
        carActionsDispatcher.getActiveCars();
      }
    }
    // @ts-ignore
    const cachedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedIn && cachedUser) {
      customerActionsDispatcher.logCustomerInWithToken(cachedUser);
    }
  }, []);

  useEffect(() => {
    if (carsReducer.lastStatus === CarActionStatuses.GET_CARS_PENDING) {
      setBackdropOpened(true);
    } else if (
      carsReducer.lastStatus !== CarActionStatuses.GET_CARS_NOT_TRIGGERED_YET &&
      carsReducer.lastStatus !== CarActionStatuses.GET_CARS_FAILED
    ) {
      let firstIndex;
      let lastIndex;
      let carsOffers;
      if (currentPage === 1) {
        firstIndex = 0;
        lastIndex = offersPerPage;
      } else {
        lastIndex = currentPage * offersPerPage;
        firstIndex = lastIndex - offersPerPage;
      }

      if (tags.length > 0) {
        carsOffers = [...carsReducer.cars]
          .filter((car) => car.tags.some((tag) => tags.includes(tag)))
          .slice(firstIndex, lastIndex)
          .map((car) => mapToCarOffer(car));
      } else {
        carsOffers = [...carsReducer.cars]
          .slice(firstIndex, lastIndex)
          .map((car) => mapToCarOffer(car));
      }
      console.log("first", firstIndex);
      console.log("last", lastIndex);

      setAllTags(
        Array.from(
          new Set(
            carsReducer.cars
              .map((carOffer) => carOffer.tags.map((tag) => tag))
              .flat()
          )
        )
      );

      setCarOffers(carsOffers);
      setBackdropOpened(false);
    } else {
      setBackdropOpened(false);
    }
  }, [carsReducer.lastStatus, carsReducer.cars, currentPage, tags]);

  function renderCarCard(carOffer: CarOffer) {
    return (
      <CarCard
        car={carOffer.carInfo}
        liked={
          customer.likedCars &&
          customer.likedCars.includes(carOffer.carInfo.licenceNumber)
        }
        onBuyClick={() => {
          setSelectedCarOffer(carOffer);
          if (customer.email === carOffer.carInfo.seller) {
            toastr.warning("Sorry", "You can't buy your own car");
          } else {
            setModalShown(true);
          }
        }}
        onLikeClick={() => {
          loggedIn
            ? customerActionsDispatcher.updateCustomer({
                ...customer,
                likedCars: [...resolveLikedCars(customer, carOffer.carInfo)],
              })
            : toastr.error("Error", "You must be logged in to 'like' car");
        }}
      />
    );
  }

  const onPaginationChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const countTotalPages = () => {
    console.log(
      "tagi",
      carsReducer.cars.filter((car) =>
        car.tags.some((tag) => tags.includes(tag))
      )
    );
    console.log(
      "tagi",
      Math.ceil(
        carsReducer.cars.filter((car) =>
          car.tags.some((tag) => tags.includes(tag))
        ).length
      )
    );
    let number = Math.ceil(
      (tags.length === 0
        ? carsReducer.cars.length
        : carsReducer.cars.filter((car) =>
            car.tags.some((tag) => tags.includes(tag))
          ).length) / offersPerPage
    );
    if (totalPages != number) {
      setTotalPages(number);
    }
    return number;
  };

  return (
    <div className={classes.root}>
      {carOffers.length > 0 ? (
        <>
          <Backdrop className={classes.backdrop} open={backdropOpened}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {selectedCarOffer && (
            <VerticallyCenteredModal
              title={"Car info"}
              show={modalShown}
              onHide={() => {
                setModalShown(false);
              }}
              size={"lg"}
            >
              <CarBuyStepper
                selectedCar={selectedCarOffer.carInfo}
                onBuy={() => setModalShown(false)}
              ></CarBuyStepper>
            </VerticallyCenteredModal>
          )}
          <div className="pagination">
            <CustomPagination
              totalPages={countTotalPages()}
              onPageChange={(pageNumber: number) => {
                console.log("zmiana strony..");
                onPaginationChange(pageNumber);
              }}
            />
          </div>
          <Row className="justify-content-md-center filters">
            <Tags
              tags={allTags}
              onTagsChange={(tagsList: string[]) => {
                setTags(tagsList);
                setCurrentPage(1);
              }}
            />
          </Row>
          <Row className="justify-content-md-center offers">
            {carOffers &&
              carOffers.map((carOffer, i) => {
                if (tags.length === 0) {
                  return renderCarCard(carOffer);
                } else {
                  if (carOffer.carInfo.tags.some((tag) => tags.includes(tag))) {
                    return renderCarCard(carOffer);
                  }
                }
              })}
          </Row>
        </>
      ) : (
        <>
          <h1>Pusto!</h1>
        </>
      )}
    </div>
  );
};

const resolveLikedCars = (customer: Customer, car: Car) => {
  let likedCars = [...customer.likedCars];
  let likedCarKey = car.licenceNumber;
  if (likedCars.includes(likedCarKey)) {
    likedCars = likedCars.filter((likedCar) => likedCar !== likedCarKey);
  } else {
    likedCars = [...likedCars, likedCarKey];
  }
  return likedCars;
};
export default CarOffersList;
