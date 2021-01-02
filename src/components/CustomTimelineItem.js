import React, { useContext, useEffect, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { FiEdit } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import { IconButton, LinearProgress, Typography } from "@material-ui/core";
import TimeAgo from "timeago-react";
import UpdateInputField from "./UpdateInputField";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import OutsideAlerterUpdate from "./OutsideAlerterUpdate";
import {
  formatAMPM,
  getDateInStorageFormat,
  isDaySame,
  resizeFile,
} from "../utils/helperFunctions";

const CustomTimelineItem = ({
  isLast,
  item,
  index,
  list,
  setList,
  activeDate,
}) => {
  const [file, setFile] = useState(null);
  const [imageLoading, setImageloading] = useState(false);
  const { title, body, writtenAt, id } = item;
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [updateTitle, setUpdateTitle] = useState(list[index].title);
  const [updateBody, setUpdateBody] = useState(list[index].body);
  const [progress, setProgress] = useState(null);
  const onSubmitHandler = async () => {
    console.log("onsubmit clicked");
    if ((updateBody.length > 0 || updateTitle.length > 0) && show && file) {
      const temp = [...list];
      const image = await resizeFile(file, setProgress);
      let uploadTask = app
        .storage()
        .ref(
          `/${currentUser.uid}/${getDateInStorageFormat(new Date())}/${
            temp[index].id
          }`
        )
        .putString(image, "data_url");
      uploadTask.on("TaskEvent.STATE_CHANGED", async function (snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (percent > 1) setProgress(percent);
      });
      uploadTask.on("state_changed", console.log, console.error, () => {
        if (
          updateTitle !== temp[index].title ||
          updateBody !== temp[index].body
        ) {
          temp[index].title = updateTitle;
          temp[index].body = updateBody;
          setList(temp);

          app
            .firestore()
            .collection(currentUser.uid)
            .doc(activeDate)
            .set({ data: temp }, { merge: true });
        }
        setProgress(null);
        setList(temp);
        setShow(false);
        setFile(null);
      });
    } else if ((updateBody.length > 0 || updateTitle.length > 0) && show) {
      const temp = [...list];
      if (
        updateTitle !== temp[index].title ||
        updateBody !== temp[index].body
      ) {
        temp[index].title = updateTitle;
        temp[index].body = updateBody;
        setList(temp);

        await app
          .firestore()
          .collection(currentUser.uid)
          .doc(activeDate)
          .set({ data: temp }, { merge: true });
      }
      setShow(false);
    }
  };
  const onClickHandler = async () => {
    await onSubmitHandler();
  };

  useEffect(() => {
    const doStuff = () => {
      setImageloading(true);
      console.log(id);
      app
        .storage()
        .ref(`/${currentUser.uid}/${getDateInStorageFormat(new Date())}/${id}`)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
          setImageloading(false);
        })
        .catch((e) => {
          setUrl(null);
          console.log("big error bro");
          setImageloading(false);
        });
    };
    doStuff();
  }, [list]);
  return (
    <OutsideAlerterUpdate
      setTitle={setUpdateTitle}
      setBody={setUpdateBody}
      title={updateTitle}
      body={updateBody}
      show={show}
      setShow={setShow}
      className="root"
      list={list}
      setList={setList}
    >
      <TimelineItem style={{}}>
        <TimelineSeparator style={{}}>
          <TimelineDot
            style={{
              // -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
              WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
              backgroundColor: "#F3F4F6",
              cursor: "pointer",
              padding: 0,
              border: 0,
            }}
          >
            {!show ? (
              <IconButton onClick={() => setShow(true)} size="small">
                <FiEdit style={{ padding: 5 }} color="#6C7385" />
              </IconButton>
            ) : (
              <IconButton onClick={onClickHandler} size="small">
                <BsCheckCircle style={{ padding: 5 }} color="#6C7385" />
              </IconButton>
            )}
          </TimelineDot>
          {!isLast ? <TimelineConnector /> : null}
        </TimelineSeparator>
        {show ? (
          <TimelineContent>
            {progress ? (
              <LinearProgress
                style={{ marginBottom: 10 }}
                variant="determinate"
                value={progress}
              />
            ) : null}
            <UpdateInputField
              setUrl={setUrl}
              url={url}
              setFile={setFile}
              file={file}
              activeDate={activeDate}
              show={show}
              setShow={setShow}
              index={index}
              list={list}
              setList={setList}
              body={updateBody}
              setBody={setUpdateBody}
              title={updateTitle}
              setTitle={setUpdateTitle}
            />
          </TimelineContent>
        ) : (
          <TimelineContent style={{ marginBottom: 30 }}>
            <Typography
              style={{
                fontWeight: "bolder",
                fontSize: 19,
                fontFamily: '"Segoe UI", serif',
              }}
            >
              {title}
            </Typography>
            <Typography
              style={{ marginBottom: 10, fontFamily: '"Segoe UI", serif' }}
            >
              {body}
            </Typography>
            {url ? (
              <img
                src={url}
                alt={""}
                style={{
                  maxHeight: 200,
                  paddingBottom: 10,
                  maxWidth: "100%",
                  display: "block",
                }}
              />
            ) : null}
            {isDaySame(new Date(), new Date(parseInt(writtenAt))) ? (
              <TimeAgo datetime={parseInt(writtenAt)} />
            ) : (
              formatAMPM(new Date(parseInt(writtenAt)))
            )}
          </TimelineContent>
        )}
      </TimelineItem>
    </OutsideAlerterUpdate>
  );
};

export default CustomTimelineItem;
