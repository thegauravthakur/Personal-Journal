import React from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const CustomInputField = ({
  show,
  setShow,
  body,
  setBody,
  setTitle,
  title,
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
          rows={!show ? 1 : 2}
          className="body"
        />
      </div>
    </div>
  );
};
export default CustomInputField;
