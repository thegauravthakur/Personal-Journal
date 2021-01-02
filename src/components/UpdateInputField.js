import React, { useContext, useState } from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { BiCameraOff } from "react-icons/bi";
import { IoMdReverseCamera } from "react-icons/io";
import CameraPicker from "./CameraPicker";
import { getDateInStorageFormat } from "../utils/helperFunctions";

const UpdateInputField = ({
  list,
  setList,
  index,
  setShow,
  setTitle,
  setBody,
  activeDate,
  file,
  setFile,
  url,
  setUrl,
}) => {
  const { currentUser } = useContext(AuthContext);
  const onDeleteHandler = async () => {
    const temp = [...list];
    const data = temp[index];
    temp.splice(index, 1);
    setList(temp);
    setShow(false);
    await app
      .storage()
      .ref(
        `/${currentUser.uid}/${getDateInStorageFormat(new Date())}/${data.id}`
      )
      .delete();
    if (temp.length > 0) {
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .set({ data: temp }, { merge: true });
    } else {
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .delete();
    }
  };
  return (
    <div
      style={{
        borderRadius: "10px",
        border: "1px solid black",
        padding: 5,
        backgroundColor: "white",
      }}
    >
      <div>
        <input
          defaultValue={list[index].title}
          onChange={(e) => setTitle(e.target.value)}
          className={"title"}
          placeholder="Title"
        />
        <TextareaAutosize
          defaultValue={list[index].body}
          rowsMax={7}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="body"
        />
        {file || url ? (
          <img
            style={{
              maxHeight: 100,
              maxWidth: "100%",
              display: "block",
            }}
            src={file ? URL.createObjectURL(file) : url}
            alt={"file"}
          />
        ) : null}
        <Grid>
          <Grid item>
            <IconButton onClick={onDeleteHandler} size="small">
              <MdDelete />
            </IconButton>
            <IconButton
              onClick={() => {
                if (url) {
                  app
                    .storage()
                    .ref(
                      `/${currentUser.uid}/${getDateInStorageFormat(
                        new Date()
                      )}/${list[index].id}`
                    )
                    .delete();
                  setUrl(null);
                  setFile(null);
                }
              }}
              size={"small"}
            >
              <BiCameraOff />
            </IconButton>
            <CameraPicker size={"small"} file={file} setFile={setFile} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default UpdateInputField;
