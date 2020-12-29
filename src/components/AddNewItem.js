import React, { useContext, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import { IconButton, makeStyles, TextField } from "@material-ui/core";
import TimelineItem from "@material-ui/lab/TimelineItem";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import CustomInputField from "./CustomInputField";
const AddNewItem = ({ list, setList }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { currentUser } = useContext(AuthContext);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const onClickHandler = async () => {
    if (body.length > 0 || title.length > 0) {
      const temp = [...list];
      temp.unshift({ title, body, writtenAt: Date.now().toString() });
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(day.toString() + month.toString() + year.toString())
        .set({ data: temp }, { merge: true })
        .then(() => setList(temp));
      setTitle("");
      setBody("");
    }
  };
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          style={{
            WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "#F3F4F6",
            cursor: "pointer",
            padding: 0,
            border: 0,
          }}
        >
          <IconButton onClick={onClickHandler} size="small">
            <AiOutlinePlus style={{ padding: 5 }} color={"#6C7385"} />
          </IconButton>
        </TimelineDot>
        {list.length > 0 ? <TimelineConnector /> : null}
      </TimelineSeparator>
      <TimelineContent>
        <CustomInputField list={list} setList={setList} />
      </TimelineContent>
    </TimelineItem>
  );
};

export default AddNewItem;
