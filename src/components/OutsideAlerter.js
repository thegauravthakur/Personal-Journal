import React, { useContext, useEffect, useRef } from "react";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { v4 as uuidv4 } from "uuid";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref,
  setShow,
  title,
  body,
  setTitle,
  setBody,
  list,
  setList
) {
  const { currentUser } = useContext(AuthContext);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  useEffect(() => {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
        if (title !== "" || body !== "") {
          const temp = [...list];
          temp.unshift({
            title,
            body,
            writtenAt: Date.now().toString(),
            id: uuidv4(),
          });
          setTitle("");
          setBody("");
          await app
            .firestore()
            .collection(currentUser.uid)
            .doc(`${day}:${month}:${year}`)
            .set({ data: temp }, { merge: true })
            .then(() => setList(temp));
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    props.setShow,
    props.title,
    props.body,
    props.setBody,
    props.setTitle,
    props.list,
    props.setList
  );
  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
