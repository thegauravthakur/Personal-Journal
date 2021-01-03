import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import app from "../api/firebase";
import { GiHamburgerMenu } from "react-icons/gi";
import DatePicker from "react-modern-calendar-datepicker";
import { BsCalendar } from "react-icons/bs";

const CustomAppbar = ({
  setDrawer,
  selectedDay,
  setSelectedDay,
  datesId,
  setActiveDate,
}) => {
  const matches = useMediaQuery("(min-width:960px)");
  const matches2 = useMediaQuery("(min-width:430px)");
  const matches3 = useMediaQuery("(min-width:340px)");

  return (
    <AppBar style={{ backgroundColor: "#f5f4f4" }} position="static">
      <Toolbar>
        <IconButton
          style={{ marginRight: 10 }}
          size={!matches ? "small" : "medium"}
          onClick={() => setDrawer(true)}
        >
          <GiHamburgerMenu />
        </IconButton>
        <Typography
          style={{
            flexGrow: 1,
            color: "#034b4b",
            fontFamily: '"Segoe UI", serif',
          }}
          variant={"h6"}
        >
          Everyday Journal
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
            }
            shouldHighlightWeekends
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
