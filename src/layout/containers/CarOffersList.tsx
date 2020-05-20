import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import {
  Car,
  CarActionStatuses,
  CarOffer,
  CarsReducer,
} from "../../interfaces/CarInfo";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../styles/carOffersList.css";
import GridList from "@material-ui/core/GridList";
import { useStyles } from "../../styles/imageGridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Backdrop, CircularProgress, IconButton } from "@material-ui/core";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import { Customer } from "../../interfaces/CustomerInfo";
import { createLikedCarKey } from "../../util/carUtils";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import { toastr } from "react-redux-toastr";
import CarBuyStepper from "../components/carBuyStepper";

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

  const [modalShown, setModalShown] = useState<boolean>(false);

  const [selectedCarOffer, setSelectedCarOffer] = useState<CarOffer>(
    carOffers[0]
  );
  useEffect(() => {
    carActionsDispatcher.getCars();
    // @ts-ignore
    const cachedUser = JSON.parse(localStorage.getItem("user"));
    if (cachedUser) {
      customerActionsDispatcher.logCustomerInWithToken(cachedUser);
    }
  }, []);

  useEffect(() => {
    if (carsReducer.lastStatus === CarActionStatuses.GET_CARS_PENDING) {
      setBackdropOpened(true);
    } else if (
      carsReducer.lastStatus === CarActionStatuses.GET_CARS_SUCCESSFUL
    ) {
      const carsOffers: CarOffer[] = carsReducer.cars.map((car) => {
        return {
          carInfo: car,
          featured: true,
          liked: false,
        };
      });
      setCarOffers(carsOffers);
      setBackdropOpened(false);
    } else {
      setBackdropOpened(false);
    }
  }, [carsReducer.lastStatus, carsReducer.cars]);

  return (
    <div className={classes.root}>
      {carsReducer.cars.length > 0 ? (
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
              ></CarBuyStepper>
            </VerticallyCenteredModal>
          )}
          <GridList cellHeight={250} spacing={10} className={classes.gridList}>
            {carOffers &&
              carOffers.map((carOffer, i) => (
                <GridListTile
                  className={classes.gridListTile}
                  key={carOffer.carInfo.images[0]}
                  cols={carOffer.featured ? 2 : 1}
                  rows={carOffer.featured ? 2 : 1}
                  onClick={() => {
                    setSelectedCarOffer(carOffer);
                  }}
                >
                  {carOffer.carInfo.buyer ? (
                    <>
                      <div className="bg-image">
                        <img
                          src={carOffer.carInfo.images[0]}
                          alt={carOffer.carInfo.model}
                        />
                      </div>
                      <div className="bg-text">
                        <h1>Offer sold</h1>
                        <p>cheers</p>
                      </div>
                    </>
                  ) : (
                    <img
                      onClick={() => {
                        if (customer.email === carOffer.carInfo.seller) {
                          toastr.warning("Sorry", "You can't buy your own car");
                        } else {
                          setModalShown(true);
                        }
                      }}
                      src={carOffer.carInfo.images[0]}
                      alt={carOffer.carInfo.model}
                    />
                  )}

                  <GridListTileBar
                    title={`${carOffer.carInfo.model}, ${carOffer.carInfo.brand}, ${carOffer.carInfo.price}${carOffer.carInfo.currency}`}
                    titlePosition="top"
                    actionIcon={
                      <IconButton
                        aria-label={`star`}
                        className={classes.icon}
                        onClick={() => {
                          loggedIn
                            ? customerActionsDispatcher.updateCustomer({
                                ...customer,
                                likedCars: [
                                  ...resolveLikedCars(
                                    customer,
                                    carOffer.carInfo
                                  ),
                                ],
                              })
                            : toastr.error(
                                "Error",
                                "You must be logged in to 'like' car"
                              );
                        }}
                      >
                        {customer.likedCars &&
                        customer.likedCars.includes(
                          createLikedCarKey(carOffer.carInfo) as string
                        ) ? (
                          <StarIcon />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </GridListTile>
              ))}
          </GridList>
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
  let likedCarKey = createLikedCarKey(car);
  if (likedCars.includes(likedCarKey)) {
    likedCars = likedCars.filter((likedCar) => likedCar !== likedCarKey);
  } else {
    likedCars = [...likedCars, likedCarKey];
  }
  return likedCars;
};
export default CarOffersList;
