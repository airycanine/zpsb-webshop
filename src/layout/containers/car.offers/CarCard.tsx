import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "../../../styles/carCard";
import { Car, CarOffer } from "../../../interfaces/CarInfo";
import { Button } from "@material-ui/core";
import "../../../styles/carCard.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

interface CarCardProps {
  car: Car;
  liked: boolean;
  onLikeClick: Function;
  onBuyClick: Function;
}

const CarCard = ({ car, onLikeClick, liked, onBuyClick }: CarCardProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <IconButton
            aria-label="add to favorites"
            onClick={() => onLikeClick()}
          >
            {liked ? <FavoriteIcon color={"secondary"} /> : <FavoriteIcon />}
          </IconButton>
        }
        titleTypographyProps={{ variant: "h5" }}
        action={
          <IconButton color={"primary"} onClick={() => onBuyClick()}>
            {"Buy "}
            <ShoppingCartIcon />
          </IconButton>
        }
        title={`${car.model} ${car.brand}`}
        subheader={`${car.price} ${car.currency}`}
      />
      <CardMedia
        className={classes.media}
        image={car.images[0]}
        title={car.images[0]}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <h4>Offer number: {car.offerNumber}</h4>
          {car.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <h5>Equipment</h5>
          </Typography>
          <Typography paragraph>{car.equipment}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CarCard;
