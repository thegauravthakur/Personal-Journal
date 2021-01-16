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

function App() {
  useEffect(() => {
    const permission = Notification.permission;
    if (
      permission !== "granted" ||
      !document.referrer.includes("android-app://in.gauravthakur.journal.twa")
    ) {
      Notification.requestPermission().then((result) => console.log(result));
    }
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
