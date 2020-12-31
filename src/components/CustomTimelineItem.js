import React, { useContext, useState } from "react";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { FiEdit } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import { IconButton, Typography } from "@material-ui/core";
import TimeAgo from "timeago-react";
import UpdateInputField from "./UpdateInputField";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import OutsideAlerterUpdate from "./OutsideAlerterUpdate";
import { formatAMPM, isDaySame } from "../utils/helperFunctions";

const CustomTimelineItem = ({
  isLast,
  item,
  index,
  list,
  setList,
  activeDate,
}) => {
  const { title, body, writtenAt } = item;
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [updateTitle, setUpdateTitle] = useState(list[index].title);
  const [updateBody, setUpdateBody] = useState(list[index].body);
  const onSubmitHandler = async () => {
    if ((updateBody.length > 0 || updateTitle.length > 0) && show) {
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
    }
    setShow(false);
  };
  const onClickHandler = async () => {
    await onSubmitHandler();
  };
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
            <UpdateInputField
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
