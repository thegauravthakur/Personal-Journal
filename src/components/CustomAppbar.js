import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import app from "../api/firebase";

const CustomAppbar = () => {
  const useStyles = makeStyles({
    btn: {
      color: "white",
    },
    brand: {
      color: "black",
      flexGrow: 1,
    },
  });
  const classes = useStyles();
  return (
    <AppBar style={{ backgroundColor: "#f5f4f4" }} position="relative">
      <Toolbar>
        <Typography variant={"h6"} className={classes.brand}>
          Personal Journal
        </Typography>
        <Button onClick={async () => await app.auth().signOut()}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
