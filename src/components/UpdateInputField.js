import React, { useContext, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { BiCameraOff } from "react-icons/bi";
import CameraPicker from "./CameraPicker";
import { getDateInStorageFormat } from "../utils/helperFunctions";
import "./UpdateInputField.css";
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
  const onDeleteHandler = () => {
    const temp = [...list];
    const data = temp[index];
    temp.splice(index, 1);
    setList(temp);
    setShow(false);
    app.storage().ref(`/${currentUser.uid}/${activeDate}/${data.id}`).delete();
    if (temp.length > 0) {
      console.log({ activeDate });
      app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .set({ data: temp }, { merge: true });
    } else {
      app.firestore().collection(currentUser.uid).doc(activeDate).delete();
    }
  };
  return (
    <div
      className="outer-box"
      style={{
        borderRadius: "10px",
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
          style={{ fontSize: 16 }}
          defaultValue={list[index].body}
          rowsMax={7}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="body"
        />
        {file || url ? (
          <img
            className="image"
            src={file ? URL.createObjectURL(file) : url}
            alt={"file"}
          />
        ) : null}
        <Grid>
          <Grid item>
            <IconButton onClick={onDeleteHandler} size="small">
              <MdDelete size={22} />
            </IconButton>
            <IconButton
              style={{ marginRight: 10, marginLeft: 6 }}
              onClick={() => {
                if (url) {
                  app
                    .storage()
                    .ref(`/${currentUser.uid}/${activeDate}/${list[index].id}`)
                    .delete();
                  setUrl(null);
                  setFile(null);
                }
              }}
              size={"small"}
            >
              <BiCameraOff size={24} />
            </IconButton>
            <CameraPicker size={"small"} file={file} setFile={setFile} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default UpdateInputField;
