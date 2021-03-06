import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { AiOutlineCamera } from "react-icons/ai";

const CameraPicker = ({ file, setFile, size }) => {
  return (
    <label className="cameraButton">
      <IconButton
        size={size ? "small" : "medium"}
        component={"div"}
        style={!size ? { padding: 0, marginTop: 10 } : {}}
      >
        <AiOutlineCamera size={size ? 25 : null} />
      </IconButton>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
        accept="image/*"
      />
    </label>
  );
};

export default CameraPicker;
