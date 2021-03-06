import React, { useState } from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./CustomInputField.css";
import CameraPicker from "./CameraPicker";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton, useMediaQuery } from "@material-ui/core";
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
  const matches = useMediaQuery("(min-width:600px)");
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
        <TextareaAutosize
          value={title}
          onChange={(e) => {
            localStorage.setItem("title", e.target.value);
            setTitle(e.target.value);
          }}
          className={"title"}
          style={{
            fontSize: matches ? 18 : 16,
            display: !show ? "none" : "block",
            fontWeight: "bolder",
          }}
          placeholder="Title"
        />
        <TextareaAutosize
          inputMode="text"
          style={{ fontSize: 16 }}
          rowsMax={7}
          value={show ? body : ""}
          onChange={(e) => {
            setBody(e.target.value);
            localStorage.setItem("body", e.target.value);
          }}
          onFocus={() => {
            setShow(true);
          }}
          placeholder={
            (body !== "" || title !== "") && !show
              ? "Take a note (draft)"
              : "Take a note..."
          }
          rows={1}
          className="body"
        />
        {file && show ? (
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
