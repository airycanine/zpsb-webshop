import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import {
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
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Backdrop, CircularProgress } from "@material-ui/core";

interface PropsFromStore {
  carsReducer: CarsReducer;
}

const CarOffersList = () => {
  const { carsReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        carsReducer: state.carsReducer,
      };
    }
  );
  const classes = useStyles();

  const [backdropOpened, setBackdropOpened] = useState(true);

  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());

  const [carOffers, setCarOffers] = useState<CarOffer[]>([]);

  useEffect(() => {
    carActionsDispatcher.getCars();
    const imageToPreview =
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Polski_Fiat_126p_rocznik_1973.jpg";
    // @ts-ignore
    // setCarOffers([...carsy]);
  }, []);

  useEffect(() => {
    if (carsReducer.lastStatus === CarActionStatuses.GET_CARS_PENDING) {
      setBackdropOpened(true);
    } else if (
      carsReducer.lastStatus === CarActionStatuses.GET_CARS_SUCCESSFUL
    ) {
      const carsOffers: CarOffer[] = carsReducer.cars.map((car) => {
        return { carInfo: car, featured: true, liked: false };
      });
      setCarOffers(carsOffers);
      setBackdropOpened(false);
    } else {
      setBackdropOpened(false);
    }
  }, [carsReducer.lastStatus, carsReducer.cars]);
  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={backdropOpened}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <GridList cellHeight={250} spacing={1} className={classes.gridList}>
        {carOffers &&
          carOffers.map((carOffer, i) => (
            <GridListTile
              onClick={() => {
                // //call update to backend
                // let ratedCars = [...cars];
                // ratedCars[i].liked = !ratedCars[i].liked;
                // setCars(ratedCars);
              }}
              className={classes.gridListTile}
              key={carOffer.carInfo.images[0]}
              cols={carOffer.featured ? 2 : 1}
              rows={carOffer.featured ? 2 : 1}
            >
              <img
                src={carOffer.carInfo.images[0]}
                alt={carOffer.carInfo.model}
              />
              <GridListTileBar
                title={`${carOffer.carInfo.model}, ${carOffer.carInfo.brand}`}
                titlePosition="top"
                actionIcon={
                  <IconButton aria-label={`star`} className={classes.icon}>
                    {carOffer.liked ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                }
                actionPosition="left"
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default CarOffersList;
