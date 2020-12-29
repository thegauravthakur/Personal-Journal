import React, { useContext, useEffect, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import CustomAppbar from "../components/CustomAppbar";
import CustomTimelineItem from "../components/CustomTimelineItem";
import AddNewItem from "../components/AddNewItem";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { formattedDate } from "../utils/helperFunctions";

const TimelineToday = () => {
  const [list, setList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const classes = useStyle();
  useEffect(() => {
    const ref = app
      .firestore()
      .collection(currentUser.uid)
      .doc(day.toString() + month.toString() + year.toString());
    ref.onSnapshot((s) => {
      if (!s.exists) {
        // ref.set({ data: [] }, { merge: true }).then();
      } else {
        setList(s.data().data);
      }
    });
  }, []);
  return (
    <Paper className={classes.root}>
      <CustomAppbar />
      <Grid container>
        <Grid item sm={3} md={4} />
        <Grid item sm={6} md={4} container direction="column">
          <Grid item>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bolder",
                color: "#334155",
                marginTop: 30,
                marginLeft: 13,
                marginBottom: 20,
              }}
            >
              {formattedDate()}
            </Typography>
          </Grid>
          <Grid item>
            <Timeline
              align="left"
              style={{ padding: 0, margin: "0 13px 0 13px" }}
            >
              <AddNewItem list={list} setList={setList} />
              {list.map((item, index) => (
                <CustomTimelineItem
                  index={index}
                  key={index}
                  item={item}
                  list={list}
                  setList={setList}
                  isLast={index === list.length - 1}
                />
              ))}
            </Timeline>
          </Grid>
        </Grid>
        <Grid item sm={3} md={4} />
      </Grid>
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
