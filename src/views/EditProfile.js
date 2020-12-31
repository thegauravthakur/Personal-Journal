import React, { useContext, useState } from "react";
import SettingAppbar from "../components/SettingAppbar";
import { Avatar, Button, Container, TextField } from "@material-ui/core";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser.displayName);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(currentUser.photoURL);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    let check = false;
    if (file) {
      check = true;
      const uploadTask = app
        .storage()
        .ref(`/${currentUser.uid}/profile`)
        .put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
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
