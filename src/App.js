import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import TimelineToday from "./views/TimelineToday";
import LoginScreen from "./views/LoginScreen";
import SettingsPage from "./views/SettingsPage";
import EditProfile from "./views/EditProfile";
import Playground from "./views/Playground";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <ProtectedRoute exact path="/settings" component={SettingsPage} />
      <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
      <ProtectedRoute path={"/playground"} component={Playground} exact />
      <ProtectedRoute component={TimelineToday} exact />
    </Switch>
  );
}

export default App;
