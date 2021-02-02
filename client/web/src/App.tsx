import React, { useState, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { checkLocationEnabled } from "./utils/mapFunctions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CreateEventScreen } from "./screens/CreateEventScreen/CreateEventScreen";
import { CreateTipScreen } from "./screens/CreateTipScreen/CreateTipScreen";

function App() {
  // userStartLocation = checkLocationEnabled();
  const [userCoordinates, setUserCoordinates] = useState(
    checkLocationEnabled()
  );
  // console.log(userStartLocation);
  //useEffect(() => {}, [setUserCoordinates]);

  useEffect(() => {});
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/createEvent">Create Event</Link>
            </li>
            <li>
              <Link to="/createTip">Create Tip</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/createEvent">
            <CreateEventScreen />
          </Route>
          <Route path="/createTip">
            <CreateTipScreen />
          </Route>
          <Route path="/">
            <HomeScreen userCoordinates={userCoordinates} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
