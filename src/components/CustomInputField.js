import React, { useState } from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./CustomInputField.css";
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
      className="outer-box"
      style={{
        borderRadius: "10px",
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
            fontSize: 18,
            display: !show ? "none" : "block",
            fontWeight: "bolder",
          }}
          placeholder="Title"
        />
        <TextareaAutosize
          style={{ fontSize: 16 }}
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
