import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import "./SimpleDialog.css";
const SimpleDialog = ({ dialog, setDialog, activeImage }) => {
  return (
    <div>
      {dialog && (
        <Lightbox
          wrapperClassName="lightbox"
          mainSrc={activeImage}
          onCloseRequest={() => setDialog(false)}
        />
      )}
    </div>
  );
};

export default SimpleDialog;
