import React, { useState } from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./customInputField.css";
import CameraPicker from "./CameraPicker";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
const CustomInputField = ({
  show,
  setShow,
  body,
  setBody,
  setTitle,
  title,
  file,
  setFile,
}) => {
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={"title"}
          style={{
            display: !show ? "none" : "block",
            fontWeight: "bolder",
          }}
          placeholder="Title"
        />
        <TextareaAutosize
          rowsMax={7}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onFocus={() => {
            setShow(true);
          }}
          placeholder="Take a note..."
          rows={1}
          className="body"
        />
        {file ? (
          <img
            style={{
              maxHeight: 100,
              maxWidth: "100%",
              display: "block",
            }}
            src={file ? URL.createObjectURL(file) : null}
            alt={"file"}
          />
        ) : null}
        {show ? <CameraPicker file={file} setFile={setFile} /> : null}
        {show && file ? (
          <IconButton
            style={{ padding: 0, marginLeft: 10, marginTop: 10 }}
            onClick={() => setFile(null)}
          >
            <AiOutlineClose />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};
export default CustomInputField;
