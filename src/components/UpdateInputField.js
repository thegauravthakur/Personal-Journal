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
          style={{ fontWeight: "bolder", fontSize: 18 }}
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
            style={{
              marginTop: 10,
              marginBottom: 10,
              maxHeight: 200,
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
              <MdDelete size={22} />
            </IconButton>
            <IconButton
              style={{ marginRight: 10, marginLeft: 6 }}
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
