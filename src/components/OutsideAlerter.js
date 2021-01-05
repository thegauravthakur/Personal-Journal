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
  setList,
  setFile,
  onClickHandler
) {
  useEffect(() => {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // setTitle("");
        // setFile(null);
        // setBody("");
        setShow(false);
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
    props.setList,
    props.setFile,
    props.onClickHandler
  );
  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
