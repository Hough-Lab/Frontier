import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { checkLocationEnabled } from './utils/mapFunctions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CreateEventScreen } from './screens/CreateEventScreen/CreateEventScreen';
import { CreateTipScreen } from './screens/CreateTipScreen/CreateTipScreen';
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { DisplayPOIScreen } from './screens/DisplayPOIScreen/DisplayPOIScreen';
import { NavBar } from './components/NavBarComponent/NavBar';
import { store } from './index';

export type AppDispatch = typeof store.dispatch;

function App() {
  // userStartLocation = checkLocationEnabled();
  // console.log(userStartLocation);
  //useEffect(() => {}, [setUserCoordinates]);

  useEffect(() => {
    checkLocationEnabled();
  }, []);
  return (
    <Router>
      <div className="App">
        <nav>
          <NavBar />
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pointOfInterest">Point of Interest</Link>
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
