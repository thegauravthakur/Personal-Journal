import React, { useContext, useEffect } from "react";
import app, { signInWithGoogle } from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { Redirect } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button, Paper, Typography } from "@material-ui/core";

const LoginScreen = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to={"/"} />;
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{}}>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold" }}
            align={"center"}
          >
            Welcome Back
          </Typography>
          <Typography
            align="center"
            style={{ maxWidth: 300, margin: "0 auto", marginBottom: 70 }}
          >
            Just a minute away from experiencing clean UI experience
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Button onClick={() => app.auth().signInAnonymously()}>
              Anonymous Login
            </Button>
            <Button
              onClick={signInWithGoogle}
              variant="outlined"
              className={""}
              startIcon={<FcGoogle />}
            >
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
