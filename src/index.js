import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/Provider";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./config/theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

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
