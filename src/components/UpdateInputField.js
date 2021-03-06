import React, { useContext, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid, IconButton, useMediaQuery } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { BiCameraOff } from "react-icons/bi";
import CameraPicker from "./CameraPicker";
import "./UpdateInputField.css";
import CustomSnackBar from "./CustomSnackBar";

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
  showSnack,
  setShowSnack,
}) => {
  const matches = useMediaQuery("(min-width:500px)");
  const { currentUser } = useContext(AuthContext);
  const onDeleteHandler = () => {
    const temp = [...list];
    const data = temp[index];
    temp.splice(index, 1);
    setShowSnack({
      ...showSnack,
      active: true,
      message: "Item Deleted!",
      type: "success",
    });
    setList(temp);
    setShow(false);
    app
      .firestore()
      .collection(currentUser.uid)
      .doc("starred")
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data().ref;
          const temp = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].id !== list[index].id) {
              temp.push(data[i]);
            }
          }
          if (temp.length > 0) {
            app
              .firestore()
              .collection(currentUser.uid)
              .doc("starred")
              .set({ ref: temp });
          } else {
            app.firestore().collection(currentUser.uid).doc("starred").delete();
          }
        }
      });
    app.storage().ref(`/${currentUser.uid}/${activeDate}/${data.id}`).delete();
    app
      .firestore()
      .collection(currentUser.uid)
      .doc(activeDate)
      .set({ data: temp }, { merge: true });
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
            style={{ maxHeight: !matches ? 200 : 250 }}
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
