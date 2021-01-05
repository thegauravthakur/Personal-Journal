import React, { useContext, useEffect, useState } from "react";
import SettingAppbar from "../components/SettingAppbar";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import StarredCard from "../components/StarredCard";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

const StarredView = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const matches2 = useMediaQuery("(min-width:600px)");
  const [temp, setTemp] = useState([]);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      // setData((prevState) => [
      //   ...prevState,
      //   { ...list[i], docName: ref["id"] },
      // ]);
      app
        .firestore()
        .collection(currentUser.uid)
        .doc("starred")
        .get()
        .then(async (snap) => {
          if (snap.exists) {
            setTemp(snap.data().ref);
          }
        });
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      for (let i = 0; i < temp.length; i++) {
        const { ref, id } = temp[i];
        const snap = await ref.get();
        const list = snap.data().data;
        const temp2 = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            temp2.push({ ...list[i], docName: ref["id"] });
          }
        }
        setData((prevState) => [...prevState, ...temp2]);
      }
    };
    getData();
  }, [temp]);
  return (
    <div>
      <SettingAppbar title={"Starred Items"} />
      <Container
        maxWidth={"lg"}
        style={{
          columnGap: 20,
          display: "grid",
          gridTemplateColumns: !matches2
            ? "repeat(1, minmax(0, 1fr))"
            : matches
            ? "repeat(3, minmax(0, 1fr))"
            : "repeat(2, minmax(0, 1fr))",
          justifyContent: "space-evenly",
          marginTop: 50,
        }}
      >
        {data.map((d, i) => (
          <StarredCard
            key={d.id}
            id={d.id}
            title={d.title}
            body={d.body}
            index={i + 1}
            date={d.writtenAt}
            docName={d.docName}
          />
        ))}
      </Container>
    </div>
  );
};

export default StarredView;
