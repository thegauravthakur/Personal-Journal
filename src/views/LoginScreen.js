import React, { useContext } from "react";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { Redirect } from "react-router-dom";

const LoginScreen = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to={"/"} />;
  return (
    <div>
      <p>login screen</p>
      <button onClick={() => app.auth().signInAnonymously()}>Login</button>
    </div>
  );
};

export default LoginScreen;
