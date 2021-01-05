import React, { useContext } from "react";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";

const Playground = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <p>playground</p>
      <button
        onClick={async () => {
          const ref = await app
            .firestore()
            .collection(currentUser.uid)
            .doc("4:1:2021");
          await app
            .firestore()
            .collection(currentUser.uid)
            .doc("starred")
            .set({ ref: [{ ref, id: 123 }] });
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          app
            .firestore()
            .collection(currentUser.uid)
            .doc("starred")
            .onSnapshot((s) => {
              if (s.exists) {
                console.log(s.data());
              }
            });
        }}
      >
        btn
      </button>
    </div>
  );
};

export default Playground;
