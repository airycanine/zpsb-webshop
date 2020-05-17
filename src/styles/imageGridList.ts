import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const windowHeight = window.innerHeight;

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
      height: `${windowHeight - windowHeight / 10}px`,
    },
    titleBar: {
      width: "80%",
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
