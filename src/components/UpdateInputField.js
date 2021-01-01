import React, { useContext } from "react";
import "./OutsideAlerter.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid, IconButton } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";

const UpdateInputField = ({
  list,
  setList,
  index,
  setShow,
  setTitle,
  setBody,
  activeDate,
}) => {
  const { currentUser } = useContext(AuthContext);

  const onDeleteHandler = async () => {
    const temp = [...list];
    const data = temp[index];
    temp.splice(index, 1);
    setList(temp);
    setShow(false);
    if (temp.length > 0) {
      await app.storage().ref(`/${currentUser.uid}/${data.id}`).delete();
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .set({ data: temp }, { merge: true });
    } else {
      await app
        .firestore()
        .collection(currentUser.uid)
        .doc(activeDate)
        .delete();
    }
  };
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
          defaultValue={list[index].title}
          onChange={(e) => setTitle(e.target.value)}
          className={"title"}
          placeholder="Title"
        />
        <TextareaAutosize
          defaultValue={list[index].body}
          rowsMax={7}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="body"
        />
        <Grid>
          <Grid item>
            <IconButton onClick={onDeleteHandler} size="small">
              <MdDelete />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default UpdateInputField;
