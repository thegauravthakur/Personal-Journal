import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { AiOutlineCamera } from "react-icons/ai";

const CameraPicker = ({ file, setFile }) => {
  return (
    <label className="cameraButton">
      <IconButton component={"div"} style={{ padding: 0, marginTop: 10 }}>
        <AiOutlineCamera />
      </IconButton>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
        accept="image/*;capture=camera"
      />
    </label>
  );
};

export default CameraPicker;
