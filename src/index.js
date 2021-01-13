import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/Provider";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./config/theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
      console.log(registration);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
