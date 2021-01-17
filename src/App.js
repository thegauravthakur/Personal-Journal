import React, { useEffect } from "react";
//fixme: remove item
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

const App = () => {
  useEffect(() => {
    const permission = Notification.permission;
    if (permission !== "granted") {
      Notification.requestPermission().then((result) => console.log(result));
    }
  });
  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <ProtectedRoute exact path="/settings" component={SettingsPage} />
      <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
      <ProtectedRoute exact path="/starred" component={StarredView} />
      <ProtectedRoute exact path={"/playground"} component={Playground} />
      <ProtectedRoute exact path={"/changelog"} component={ChangelogView} />
      <ProtectedRoute exact path={"/contact"} component={ContactUsView} />
      <ProtectedRoute exact path={"/"} component={TimelineToday} />
    </Switch>
  );
};

export default App;
