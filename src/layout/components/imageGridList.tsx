import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { useStyles } from "../../styles/imageGridList";

const ImageGridList = (props: any) => {
  const classes = useStyles();
  const { tileData } = props;
  const [cars, setCars] = useState(tileData);
  return (
    <div className={classes.root}>
      <GridList cellHeight={250} spacing={1} className={classes.gridList}>
        // @ts-ignore
        {cars.map((tile, i) => (
          <GridListTile
            onClick={() => {
              //call update to backend
              let ratedCars = [...cars];
              ratedCars[i].liked = !ratedCars[i].liked;
              setCars(ratedCars);
            }}
            className={classes.gridListTile}
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  {tile.liked ? <StarIcon /> : <StarBorderIcon />}
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

export default ImageGridList;
