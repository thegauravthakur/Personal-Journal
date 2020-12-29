import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import TimelineToday from "./views/TimelineToday";
import LoginScreen from "./views/LoginScreen";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <ProtectedRoute component={TimelineToday} exact />
    </Switch>
  );
}

export default App;
