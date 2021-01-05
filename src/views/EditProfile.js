import React, { useContext, useState } from "react";
import SettingAppbar from "../components/SettingAppbar";
import {
  Avatar,
  Button,
  Container,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import "../styles/EditProfile.css";
import { getDateInStorageFormat, resizeFile } from "../utils/helperFunctions";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser.displayName);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(currentUser.photoURL);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    let check = false;
    if (file) {
      check = true;
      const image = await resizeFile(file, setProgress);
      let uploadTask = app
        .storage()
        .ref(`/${currentUser.uid}/profile`)
        .putString(image, "data_url");
      uploadTask.on("TaskEvent.STATE_CHANGED", async function (snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (percent > 1) setProgress(percent);
        if (percent === 100) {
        }
      });
      uploadTask.on("state_changed", console.log, console.error, () => {
        setProgress(null);
        app
          .storage()
          .ref(`/${currentUser.uid}/profile`)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            app
              .auth()
              .currentUser.updateProfile({ photoURL: url })
              .then(() => setLoading(false));
          });
      });
    }
    if (name !== currentUser.disabled && name && name.length > 0) {
      check = true;
      app
        .auth()
        .currentUser.updateProfile({ displayName: name })
        .then(() => setLoading(false));
    }
    if (!check) {
      setLoading(false);
    }
  }

  return (
    <div>
      <SettingAppbar title={"Edit Profile"} />
      <Container maxWidth={"sm"} style={{ marginTop: 50 }}>
        {progress ? (
          <LinearProgress variant={"determinate"} value={progress} />
        ) : null}
        <label className="custom-file-upload">
          <input accept="image/*" type="file" onChange={handleChange} />
          <Avatar
            src={file ? URL.createObjectURL(file) : url}
            style={{
              width: 200,
              height: 200,
              margin: "0 auto",
              border: "2px solid blue",
              cursor: "pointer",
            }}
          />
        </label>
        <TextField
          style={{ marginBottom: 20 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin={"dense"}
          label="Full Name"
          fullWidth
        />
        <Button
          disabled={loading}
          onClick={handleUpload}
          variant="contained"
          style={{ backgroundColor: "#f5f4f4" }}
          fullWidth
        >
          Update
        </Button>
      </Container>
    </div>
  );
};

export default EditProfile;
