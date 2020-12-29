import React, { useState } from "react";
import OutsideAlerter from "./OutsideAlerter";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const CustomInputField = ({ list, setList }) => {
  const [show, setShow] = React.useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <OutsideAlerter
      setTitle={setTitle}
      setBody={setBody}
      title={title}
      body={body}
      setShow={setShow}
      className="root"
      list={list}
      setList={setList}
    >
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
            style={{ display: !show ? "none" : "block" }}
            placeholder="title"
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
    </OutsideAlerter>
  );
};
export default CustomInputField;
