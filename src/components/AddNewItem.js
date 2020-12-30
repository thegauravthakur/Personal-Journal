import React, { useContext, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { AiOutlinePlus } from "react-icons/ai";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import { IconButton } from "@material-ui/core";
import TimelineItem from "@material-ui/lab/TimelineItem";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import CustomInputField from "./CustomInputField";
import OutsideAlerter from "./OutsideAlerter";
import { v4 as uuidv4 } from "uuid";

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
      temp.unshift({
        title,
        body,
        writtenAt: Date.now().toString(),
        id: uuidv4(),
      });
      setTitle("");
      setBody("");
      setShow(false);
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(`${day}:${month}:${year}`)
        .set({ data: temp }, { merge: true })
        .then(() => setList(temp));
    }
  };
  const [show, setShow] = React.useState(false);
  return (
    <OutsideAlerter
      setTitle={setTitle}
      setBody={setBody}
      title={title}
      body={body}
      setShow={setShow}
      className="root"
      list={list}
      setList={setList}
    >
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
        <TimelineContent style={{ marginBottom: 30 }}>
          <CustomInputField
            list={list}
            setList={setList}
            show={show}
            setShow={setShow}
            body={body}
            setBody={setBody}
            title={title}
            setTitle={setTitle}
          />
        </TimelineContent>
      </TimelineItem>
    </OutsideAlerter>
  );
};

export default AddNewItem;
