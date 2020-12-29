import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const CustomAppbar = () => {
  const useStyles = makeStyles({
    btn: {
      color: "white",
    },
    brand: {
      flexGrow: 1,
    },
  });
  const classes = useStyles();
  return (
    <AppBar style={{ backgroundColor: "#4B5563" }} position="relative">
      <Toolbar>
        <Typography variant={"h6"} className={classes.brand}>
          Journal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
