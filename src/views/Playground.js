import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core";

const Playground = () => {
  const theme = useTheme();
  return (
    <div>
      <p>playground</p>
      <button
        onClick={() => {
          console.log(theme.palette.type);
        }}
      >
        click
      </button>
    </div>
  );
};

export default Playground;
