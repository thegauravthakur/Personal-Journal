import React, { useContext, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import { makeStyles, TextareaAutosize } from "@material-ui/core";
import "./DaySummaryDialog.css";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DaySummaryDialog({
  setDialog,
  dialog,
  activeDate,
  daySummary,
  setDaySummary,
}) {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(daySummary ? daySummary : "");
    console.log("update");
  }, [daySummary, dialog]);
  const handleClose = () => {
    setText("");
    setDialog(false);
  };
  const onClickHandler = async () => {
    setDaySummary(text);
    setDialog(false);
    if (daySummary !== text) {
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .set({ daySummary: text }, { merge: true });
    }
  };
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialog}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Day Summary
      </DialogTitle>
      <DialogContent dividers style={{ overflow: "hidden" }}>
        <TextareaAutosize
          className="textarea"
          placeholder={"Enter your day summary here..."}
          style={{
            width: "100%",
            resize: "none",
            paddingTop: 5,
            paddingBottom: 5,
            border: "none",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickHandler} color="primary">
          Save Summary
        </Button>
      </DialogActions>
    </Dialog>
  );
}
