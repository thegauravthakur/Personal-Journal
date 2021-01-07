import React, { useContext, useEffect, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { FiEdit } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {
  CardMedia,
  IconButton,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import TimeAgo from "timeago-react";
import UpdateInputField from "./UpdateInputField";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import OutsideAlerterUpdate from "./OutsideAlerterUpdate";
import { formatAMPM, isDaySame, resizeFile } from "../utils/helperFunctions";
import { AiFillSetting } from "react-icons/all";
import CustomSnackBar from "./CustomSnackBar";

const CustomTimelineItem = ({
  isLast,
  item,
  index,
  list,
  setList,
  activeDate,
  setDialog,
  setActiveImage,
}) => {
  const matches = useMediaQuery("(min-width:500px)");
  const [file, setFile] = useState(null);
  const { title, body, writtenAt, id } = item;
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [updateTitle, setUpdateTitle] = useState(list[index].title);
  const [updateBody, setUpdateBody] = useState(list[index].body);
  const [progress, setProgress] = useState(null);
  const [starredList, setStarredList] = useState([]);
  const [showSnack, setShowSnack] = useState({
    active: false,
    type: "success",
    message: "",
  });
  useEffect(() => {
    app
      .firestore()
      .collection(currentUser.uid)
      .doc("starred")
      .onSnapshot((s) => {
        if (s.exists) {
          setStarredList(s.data().ref);
        }
      });
  }, []);
  const onSubmitHandler = async () => {
    console.log("onsubmit clicked");
    if ((updateBody.length > 0 || updateTitle.length > 0) && show && file) {
      const temp = [...list];
      const image = await resizeFile(file, setProgress);
      let uploadTask = app
        .storage()
        .ref(`/${currentUser.uid}/${activeDate}/${temp[index].id}`)
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
    console.log("image useEffect running");
    const doStuff = () => {
      app
        .storage()
        .ref(`/${currentUser.uid}/${activeDate}/${id}`)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
        .catch((e) => {
          setUrl(null);
        });
    };
    doStuff();
  }, [list]);
  return (
    <div>
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
                setShowSnack={setShowSnack}
                showSnack={showSnack}
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
                style={{
                  marginBottom: 10,
                  fontFamily: '"Segoe UI", serif',
                  userSelect: "none",
                }}
              >
                {body}
              </Typography>
              {url ? (
                <img
                  onClick={() => {
                    setActiveImage(url);
                    setDialog(true);
                  }}
                  src={url}
                  alt={""}
                  style={{
                    borderRadius: "0.5rem",
                    maxHeight: !matches ? 200 : 250,
                    marginBottom: 10,
                    maxWidth: "100%",
                    display: "block",
                    cursor: "pointer",
                  }}
                />
              ) : // <CardMedia image={url} style={{ paddingTop: "56.25%" }} />
              null}
              <div style={{ display: "flex", userSelect: "none" }}>
                {isDaySame(new Date(), new Date(parseInt(writtenAt))) ? (
                  <TimeAgo
                    style={{ fontFamily: '"Segoe UI", serif' }}
                    datetime={parseInt(writtenAt)}
                  />
                ) : (
                  formatAMPM(new Date(parseInt(writtenAt)))
                )}
                {starredList.filter((item) => item.id === list[index].id)
                  .length === 1 ? (
                  <AiFillStar
                    onClick={async () => {
                      const temp = starredList.filter(
                        (item) => item.id !== list[index].id
                      );
                      setStarredList(temp);
                      await app
                        .firestore()
                        .collection(currentUser.uid)
                        .doc("starred")
                        .set({ ref: temp });
                      setShowSnack({
                        ...showSnack,
                        active: true,
                        message: "Event Un-Starred!",
                        type: "success",
                      });
                    }}
                    style={{
                      alignSelf: "flex-end",
                      marginLeft: 5,
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <AiOutlineStar
                    onClick={async () => {
                      const ref = await app
                        .firestore()
                        .collection(currentUser.uid)
                        .doc(activeDate);
                      await app
                        .firestore()
                        .collection(currentUser.uid)
                        .doc("starred")
                        .set(
                          {
                            ref: [...starredList, { ref, id: list[index].id }],
                          },
                          { merge: true }
                        );
                      setShowSnack({
                        ...showSnack,
                        active: true,
                        message: "Event Starred!",
                        type: "success",
                      });
                    }}
                    style={{
                      alignSelf: "flex-end",
                      marginLeft: 5,
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
            </TimelineContent>
          )}
        </TimelineItem>
      </OutsideAlerterUpdate>
      <CustomSnackBar
        type={showSnack.type}
        message={showSnack.message}
        open={showSnack.active}
        setOpen={setShowSnack}
      />
    </div>
  );
};

export default CustomTimelineItem;
