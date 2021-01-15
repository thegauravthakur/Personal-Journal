import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import TimelineToday from "./views/TimelineToday";
import LoginScreen from "./views/LoginScreen";
import SettingsPage from "./views/SettingsPage";
import EditProfile from "./views/EditProfile";
import Playground from "./views/Playground";
import StarredView from "./views/StarredView";
import ChangelogView from "./views/ChangelogView";
import ContactUsView from "./views/ContactUsView";
import app from "./api/firebase";

function App() {
  useEffect(() => {
    app
      .messaging()
      .getToken()
      .then((token) => console.log(token));
  });
  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <ProtectedRoute exact path="/settings" component={SettingsPage} />
      <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
      <ProtectedRoute exact path="/starred" component={StarredView} />
      <ProtectedRoute path={"/playground"} component={Playground} exact />
      <ProtectedRoute path={"/changelog"} component={ChangelogView} exact />
      <ProtectedRoute path={"/contact"} component={ContactUsView} exact />
      <ProtectedRoute path={"/"} component={TimelineToday} exact />
    </Switch>
  );
}

export default App;
