import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import app from "../api/firebase";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const CustomAppbar = ({ title }) => {
  const history = useHistory();
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
        <IconButton
          onClick={() => history.push("/")}
          style={{ marginRight: 10 }}
        >
          <BiArrowBack />
        </IconButton>
        <Typography variant={"h6"} className={classes.brand}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          onClick={async () => await app.auth().signOut()}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
