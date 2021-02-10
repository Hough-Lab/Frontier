import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CreateEventScreen } from "./screens/CreateEventScreen/CreateEventScreen";
import { CreateTipScreen } from "./screens/CreateTipScreen/CreateTipScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { DisplayPOIScreen } from "./screens/DisplayPOIScreen/DisplayPOIScreen";
import { store } from "./index";

export type AppDispatch = typeof store.dispatch;

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/pointOfInterest">
            <DisplayPOIScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/createEvent">
            <CreateEventScreen />
          </Route>
          <Route path="/createTip">
            <CreateTipScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
