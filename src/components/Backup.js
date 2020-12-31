import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";

const Backup = () => {
  const [backup, setBackup] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const ref = app.firestore().collection(currentUser.uid).get();
    ref.then((data) => {
      const temp = [];
      data.docs.forEach(async (d) => {
        await app
          .firestore()
          .collection(currentUser.uid)
          .doc(d["id"])
          .get()
          .then((dd) => {
            temp.push({ id: d["id"], data: dd.data() });
          });
      });
      setBackup(temp);
    });
  }, [currentUser]);

  const downloadTxtFile = () => {
    const jsonText = JSON.stringify({ backup });
    const element = document.createElement("a");
    const file = new Blob([jsonText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "backup.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div>
      <Button variant="outlined" onClick={downloadTxtFile}>
        Download
      </Button>
    </div>
  );
};

export default Backup;
