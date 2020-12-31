import React, { useContext, useState } from "react";
import { signInWithGoogle } from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { Redirect } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button, LinearProgress, Typography } from "@material-ui/core";

const LoginScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  if (currentUser) return <Redirect to={"/"} />;
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      {loading ? <LinearProgress /> : null}
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

          <Button
            fullWidth
            onClick={() => signInWithGoogle(setLoading)}
            variant="outlined"
            className={""}
            startIcon={<FcGoogle />}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
