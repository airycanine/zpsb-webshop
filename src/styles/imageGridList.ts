import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "1%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "80%",
      height: 800,
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "white",
    },
    gridListTile: {
      borderRadius: "8px",
    },
  })
);
