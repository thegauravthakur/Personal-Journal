import React, { useEffect } from "react";
import Axios from "axios";

const Playground = () => {
  return (
    <div>
      <p>playground</p>
      <button
        onClick={() => {
          Axios({
            url:
              "http://localhost:3001/upload?destination=outerFolder/innerFolder/package.json",
            method: "POST",
          }).then((d) => console.log(d));
        }}
      >
        click
      </button>
    </div>
  );
};

export default Playground;
