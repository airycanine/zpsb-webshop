/* eslint-disable no-use-before-define */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green, purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      backgroundColor: "whitesmoke",
      width: "30%",
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  });
});
interface TagsProps {
  tags: string[];
  onTagsChange: Function;
}
export const Tags = ({ tags, onTagsChange }: TagsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        onChange={(event, value) => onTagsChange(value)}
        multiple
        id="tags-outlined"
        options={tags}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Tags"
            placeholder="add"
          />
        )}
      />
    </div>
  );
};

export default Tags;
