import React, { useContext, useEffect, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import CustomAppbar from "../components/CustomAppbar";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import {
  checkIfDayIsGreater,
  formattedDate,
  isDaySame,
  validTime,
} from "../utils/helperFunctions";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "../styles/calendar.css";
import AddNewItem from "../components/AddNewItem";
import CustomTimelineItem from "../components/CustomTimelineItem";
import CustomDrawer from "../components/CustomDrawer";
import SimpleDialog from "../components/SimpleDialog";
import "../components/TimelineToday.css";
import DaySummaryDialog from "../components/DaySummryDialog";
import { Skeleton } from "@material-ui/lab";

const TimelineToday = () => {
  const [daySummary, setDaySummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(null);
  const [summaryDialog, setSummaryDialog] = useState(false);
  const [list, setList] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [dialog, setDialog] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [loading1, setLoading1] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1; //months from 1-12
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const triggerDate = new Date(`${day}/${month}/${year} 9:57:00 AM`);
  const [activeDate, setActiveDate] = useState(`${day}:${month}:${year}`);
  const defaultValue = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
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

  useEffect(() => {
    setSummaryLoading(true);
    app
      .firestore()
      .collection(currentUser.uid)
      .doc(activeDate)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setDaySummary(snap.data().daySummary);
          setSummaryLoading(false);
        } else {
          setDaySummary(null);
          setSummaryLoading(false);
        }
      });
  }, [daySummary, selectedDay]);

  return (
    <Paper className="wrapper">
      <CustomAppbar
        setSelectedDay={setSelectedDay}
        setActiveDate={setActiveDate}
        selectedDay={selectedDay}
        datesId={datesId}
        setDrawer={setDrawer}
      />
      <Grid container justify="space-evenly">
        <Grid xs={11} sm={8} md={6} lg={4} item container direction="column">
          <Grid item>
            <Typography
              style={{
                fontWeight: "bolder",
                color: "#334155",
                marginTop: 30,
                marginBottom: 15,
                fontFamily: "'Segoe UI', serif",
              }}
              className="header"
              variant={"h4"}
            >
              {formattedDate(
                new Date(
                  selectedDay.year,
                  selectedDay.month - 1,
                  selectedDay.day
                )
              )}
            </Typography>
          </Grid>
          {checkIfDayIsGreater(
            selectedDay.day,
            selectedDay.month,
            selectedDay.year,
            datesId
          ) ? (
            validTime() ||
            !isDaySame(
              new Date(),
              new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day)
            ) ? (
              <Grid item>
                <Divider />
                <div className="daily-summary-wrapper">
                  <Typography
                    style={{
                      paddingBottom: 15,
                      paddingTop: 15,
                      minWidth: "100%",
                      cursor: "pointer",
                      color: "#78716C",
                    }}
                    component={"button"}
                    onClick={() => setSummaryDialog(true)}
                    className="daily-summary-wrapper-text"
                  >
                    {!summaryLoading ? (
                      daySummary ? (
                        daySummary
                      ) : isDaySame(
                          new Date(),
                          new Date(
                            selectedDay.year,
                            selectedDay.month - 1,
                            selectedDay.day
                          )
                        ) ? (
                        "So, How was your day? Click here to add your day summary."
                      ) : (
                        "Do you remember what happened on that day?"
                      )
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                    {/*{!daySummary &&*/}
                    {/*isDaySame(*/}
                    {/*  new Date(),*/}
                    {/*  new Date(*/}
                    {/*    selectedDay.year,*/}
                    {/*    selectedDay.month - 1,*/}
                    {/*    selectedDay.year*/}
                    {/*  )*/}
                    {/*)*/}
                    {/*  ? "So, How was your day? Click here to add your day summary."*/}
                    {/*  : !isDaySame(*/}
                    {/*      new Date(),*/}
                    {/*      new Date(*/}
                    {/*        selectedDay.year,*/}
                    {/*        selectedDay.month - 1,*/}
                    {/*        selectedDay.day*/}
                    {/*      )*/}
                    {/*    ) */}
                    {/*  ? "Do you remember what happened on that day?"*/}
                    {/*  : daySummary}*/}
                  </Typography>
                </div>
                <Divider style={{ marginBottom: 30 }} />
              </Grid>
            ) : null
          ) : null}
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
                    setActiveImage={setActiveImage}
                    dialog={dialog}
                    setDialog={setDialog}
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
      <CustomDrawer
        datesId={datesId}
        selectedDay={selectedDay}
        setActiveDate={setActiveDate}
        setSelectedDay={setSelectedDay}
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <SimpleDialog
        activeImage={activeImage}
        dialog={dialog}
        setDialog={setDialog}
      />
      <DaySummaryDialog
        daySummary={daySummary}
        setDaySummary={setDaySummary}
        activeDate={activeDate}
        setDialog={setSummaryDialog}
        dialog={summaryDialog}
      />
    </Paper>
  );
};
export default TimelineToday;
