import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        zIndex: 2,
      },
    },
  })
);

interface CustomPaginationProps {
  onPageChange: Function;
  totalPages: number;
}

export default function CustomPagination({
  onPageChange,
  totalPages,
}: CustomPaginationProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        onChange={(object, page) => onPageChange(page)}
        count={totalPages}
        variant="outlined"
        color="secondary"
      />
    </div>
  );
}
