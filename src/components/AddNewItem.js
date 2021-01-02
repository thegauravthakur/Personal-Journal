import React, { useContext, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { AiOutlinePlus } from "react-icons/ai";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import { IconButton, LinearProgress } from "@material-ui/core";
import TimelineItem from "@material-ui/lab/TimelineItem";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import CustomInputField from "./CustomInputField";
import OutsideAlerter from "./OutsideAlerter";
import { v4 as uuidv4 } from "uuid";
import { getDateInStorageFormat, resizeFile } from "../utils/helperFunctions";

const AddNewItem = ({ list, setList }) => {
  const [progress, setProgress] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const onClickHandler = async () => {
    if ((body.length > 0 || title.length > 0) && file) {
      const data = {
        title,
        body,
        writtenAt: Date.now().toString(),
        id: uuidv4(),
      };
      const image = await resizeFile(file, setProgress);
      let uploadTask = app
        .storage()
        .ref(
          `/${currentUser.uid}/${getDateInStorageFormat(new Date())}/${data.id}`
        )
        .putString(image, "data_url");

      uploadTask.on("TaskEvent.STATE_CHANGED", async function (snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (percent > 1) setProgress(percent);
        if (percent === 100) {
        }
      });
      uploadTask.on("state_changed", console.log, console.error, () => {
        app
          .storage()
          .ref(
            `/${currentUser.uid}/${getDateInStorageFormat(new Date())}/${
              data.id
            }`
          )
          .getDownloadURL()
          .then(async (url) => {
            setProgress(null);
            const temp = [...list];
            temp.unshift(data);
            setTitle("");
            setBody("");
            setShow(false);
            setFile(null);
            await app
              .firestore()
              .collection(currentUser.uid)
              .doc(`${day}:${month}:${year}`)
              .set({ data: temp }, { merge: true })
              .then(() => setList(temp));
          });
      });
    } else if (body.length > 0 || title.length > 0) {
      const data = {
        title,
        body,
        writtenAt: Date.now().toString(),
        id: uuidv4(),
      };
      setProgress(null);
      const temp = [...list];
      temp.unshift(data);
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
      setFile={setFile}
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
          {progress ? (
            <LinearProgress
              style={{ marginBottom: 10 }}
              variant="determinate"
              value={progress}
            />
          ) : null}
          <CustomInputField
            file={file}
            setFile={setFile}
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
