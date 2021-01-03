import React, { useEffect, useState } from "react";
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
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
import { BsCalendar, BsImage } from "react-icons/bs";
const CustomAppbar = ({
  setDrawer,
  selectedDay,
  setSelectedDay,
  datesId,
  setActiveDate,
}) => {
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
  const matches = useMediaQuery("(min-width:960px)");
  const matches2 = useMediaQuery("(min-width:430px)");
  const matches3 = useMediaQuery("(min-width:340px)");
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

        {matches ? (
          <Button
            variant={"outlined"}
            onClick={async () => await app.auth().signOut()}
          >
            Logout
          </Button>
        ) : (
          <DatePicker
            customDaysClassName={datesId}
            value={selectedDay}
            onChange={(e) => {
              setActiveDate(`${e.day}:${e.month}:${e.year}`);
              setSelectedDay(e);
            }}
            renderInput={({ ref }) =>
              matches3 ? (
                <Button variant="outlined" startIcon={<BsCalendar />} ref={ref}>
                  {!matches2 ? "Date" : "Change Date"}
                </Button>
              ) : (
                <IconButton ref={ref}>
                  <BsCalendar />
                </IconButton>
              )
            } // render a custom input
            shouldHighlightWeekends
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
