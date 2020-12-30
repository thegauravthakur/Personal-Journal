import React, { useContext } from "react";
import { signInWithGoogle } from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { Redirect } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@material-ui/core";

const LoginScreen = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to={"/"} />;
  return (
    <div>
      <p>login screen</p>
      {/*<button onClick={() => app.auth().signInAnonymously()}>Login</button>*/}
      <Button
        onClick={signInWithGoogle}
        variant="contained"
        className={""}
        startIcon={<FcGoogle />}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default LoginScreen;
