import React, { useContext, useEffect, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CustomAppbar from "../components/CustomAppbar";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { formattedDate, isDaySame } from "../utils/helperFunctions";
import { Calendar } from "react-modern-calendar-datepicker";
import "../styles/calendar.css";
import AddNewItem from "../components/AddNewItem";
import CustomTimelineItem from "../components/CustomTimelineItem";
import CustomDrawer from "../components/CustomDrawer";

const TimelineToday = () => {
  const [list, setList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading1, setLoading1] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const [activeDate, setActiveDate] = useState(`${day}:${month}:${year}`);
  const defaultValue = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const classes = useStyle();
  useEffect(() => {
    setLoading1(true);
    const ref = app.firestore().collection(currentUser.uid).doc(activeDate);
    ref.onSnapshot((s) => {
      if (!s.exists) {
        setLoading1(false);
        setList([]);
      } else {
        setLoading1(false);
        setList(s.data().data);
      }
    });
  }, [activeDate]);
  const [datesId, setDatesId] = useState([]);
  useEffect(() => {
    const ref = app.firestore().collection(currentUser.uid).get();
    ref.then((data) => {
      const temp = [];
      data.docs.forEach((d) => {
        const fullDate = d["id"].split(":");
        temp.push({
          day: parseInt(fullDate[0]),
          month: parseInt(fullDate[1]),
          year: parseInt(fullDate[2]),
          className: "custom-tile",
        });
      });
      setDatesId(temp);
    });
  }, [list]);

  return (
    <Paper className={classes.root}>
      <CustomAppbar setDrawer={setDrawer} />
      <Grid container justify="space-evenly">
        <Grid xs={11} sm={8} md={6} lg={4} item container direction="column">
          <Grid item>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bolder",
                color: "#334155",
                marginTop: 30,
                marginBottom: 20,
                fontFamily: '"Segoe UI", serif',
              }}
            >
              {formattedDate(
                new Date(selectedDay.year, selectedDay.month, selectedDay.day)
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Timeline align="left" style={{ padding: 0, margin: 0 }}>
              {isDaySame(
                new Date(),
                new Date(
                  selectedDay.year,
                  selectedDay.month - 1,
                  selectedDay.day
                )
              ) ? (
                <AddNewItem list={list} setList={setList} />
              ) : null}
              {!loading1 ? (
                list.map((item, index) => (
                  <CustomTimelineItem
                    index={index}
                    key={item.id}
                    item={item}
                    list={list}
                    setList={setList}
                    activeDate={activeDate}
                    isLast={index === list.length - 1}
                  />
                ))
              ) : (
                <CircularProgress />
              )}
              {list.length === 0 && !loading1 ? (
                <Typography variant={"h6"}>Empty Here!</Typography>
              ) : null}
            </Timeline>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 35 }}>
          <div>
            <Calendar
              customDaysClassName={datesId}
              value={selectedDay}
              onChange={(e) => {
                setActiveDate(`${e.day}:${e.month}:${e.year}`);
                setSelectedDay(e);
              }}
              shouldHighlightWeekends
            />
          </div>
        </Grid>
      </Grid>
      <CustomDrawer drawer={drawer} setDrawer={setDrawer} />
    </Paper>
  );
};
const useStyle = makeStyles({
  root: {
    minHeight: "100vh",
  },
  wrapper: {},
});
export default TimelineToday;
