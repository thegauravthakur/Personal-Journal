import React from "react";
import { Snackbar } from "@material-ui/core";

const CustomSnackBar = ({ open, setOpen, message, type }) => {
  return (
    <Snackbar
      ContentProps={{ style: { backgroundColor: "#374151" } }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen({ ...open, active: false })}
      message={message}
    />
  );
};

export default CustomSnackBar;
