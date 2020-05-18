import React, { useEffect } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Car } from "../../interfaces/CarInfo";
import OfferInfoCard from "./offerInfoCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: "hidden",
      display: "block",
      width: "100%",
    },
  })
);
interface CarCardStepperProps {
  cars: Car[];
}

const CarCardStepper = ({ cars }: CarCardStepperProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cars.length;
  if (cars[activeStep] == undefined) {
    setActiveStep(0);
    return <div>Loading..</div>;
  } else {
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>Offer</Typography>
        </Paper>
        <OfferInfoCard
          imageSrc={cars[activeStep].images[0]}
          title={cars[activeStep].model}
        >
          <div>Brand: {cars[activeStep].brand}</div>
          <div>Buyer: {cars[activeStep].buyer}</div>
          <div>Seller: {cars[activeStep].seller}</div>
          <div>
            Price: {cars[activeStep].price}
            {cars[activeStep].currency}
          </div>
          <div>Licence number: {cars[activeStep].licenceNumber}</div>
        </OfferInfoCard>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => {
                setActiveStep(activeStep - 1);
              }}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
    );
  }
};
export default CarCardStepper;
