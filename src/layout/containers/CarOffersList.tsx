import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";
import { CarOffer, CarReducer } from "../../interfaces/CarInfo";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../styles/carOffersList.css";
import GridList from "@material-ui/core/GridList";
import { useStyles } from "../../styles/imageGridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

interface PropsFromStore {
  carReducer: CarReducer;
}

const CarOffersList = () => {
  const { carReducer } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        carReducer: state.carReducer,
      };
    }
  );
  const classes = useStyles();

  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());

  const [carOffers, setCarOffers] = useState<CarOffer[]>([]);

  useEffect(() => {
    const carsy = [];
    const imageToPreview =
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Polski_Fiat_126p_rocznik_1973.jpg";
    carsy.push({
      carInfo: {
        brand: "Fiat",
        currency: "PLN",
        images: [imageToPreview],
        licenceNumber: "ZS2138k",
        model: "Polski, Najlepszy",
        price: "666",
      },
      featured: true,
      liked: true,
    });
    // @ts-ignore
    setCarOffers([...carsy]);
  }, []);
  return (
    <div className={classes.root}>
      <GridList cellHeight={250} spacing={1} className={classes.gridList}>
        {carOffers.map((carOffer, i) => (
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
    // <ImageGridList
    //   cars={[
    //     {
    //       img: "https://i.ytimg.com/vi/nCalqGEPSsg/maxresdefault.jpg",
    //       title: "Model&Brand",
    //       author: "walatinio@gmail.com",
    //       featured: true,
    //     },
    //     {
    //       img:
    //         "https://upload.wikimedia.org/wikipedia/commons/3/3d/2019_SSC_Tuatara_at_Pebble_Beach_Press_Conference.jpg",
    //       title: "Model&Brand",
    //       author: "Ziomo",
    //       featured: true,
    //     },
    //   ]}
    // ></ImageGridList>
    // <ListGroup>
    //   {cars.map(() => {
    //     return (
    //       <ListGroup.Item className="">
    //         <LazyLoadImage
    //           alt={"image"}
    //           effect="blur"
    //           src={cars[0].images[0]}
    //         />
    //       </ListGroup.Item>
    //     );
    //   })}
    // </ListGroup>
  );
};

export default CarOffersList;
