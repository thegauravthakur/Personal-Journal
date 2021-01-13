import React, { useEffect, useRef } from "react";

function useOutsideAlerter(
  ref,
  title,
  body,
  setTitle,
  setBody,
  list,
  setList,
  show,
  setShow
) {
  useEffect(() => {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
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
function OutsideAlerterUpdate(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    props.title,
    props.body,
    props.setBody,
    props.setTitle,
    props.list,
    props.setList,
    props.show,
    props.setShow
  );
  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideAlerterUpdate;
