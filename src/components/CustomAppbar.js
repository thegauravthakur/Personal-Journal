import React from "react";
import styled from "styled-components";
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

  const StyledAppBar = styled(AppBar)`
    background-color: #f5f4f4;
  `;

  const StyledHamBurgerMenu = styled(IconButton)`
    margin-right: 10px;
  `;
  const StyledBrand = styled(Typography)`
    flex-grow: 1;
    color: #034b4b;
    font-family: "Segoe UI", serif;
  `;
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledHamBurgerMenu
          size={!matches ? "small" : "medium"}
          onClick={() => setDrawer(true)}
        >
          <GiHamburgerMenu />
        </StyledHamBurgerMenu>
        <StyledBrand variant={"h6"}>Everyday Journal</StyledBrand>
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
    </StyledAppBar>
  );
};

export default CustomAppbar;
