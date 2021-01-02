import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import app from "../api/firebase";
import { GiHamburgerMenu } from "react-icons/gi";

const CustomAppbar = ({ setDrawer }) => {
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
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <AppBar style={{ backgroundColor: "#f5f4f4" }} position="static">
      <Toolbar>
        <IconButton
          size={!matches ? "small" : "medium"}
          onClick={() => setDrawer(true)}
          style={{ marginRight: 10 }}
        >
          <GiHamburgerMenu />
        </IconButton>
        <Typography variant={"h6"} className={classes.brand}>
          Personal Journal
        </Typography>
        <Button
          variant={"outlined"}
          onClick={async () => await app.auth().signOut()}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
