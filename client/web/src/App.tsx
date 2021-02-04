import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CreateEventScreen } from './screens/CreateEventScreen/CreateEventScreen';
import { CreateTipScreen } from './screens/CreateTipScreen/CreateTipScreen';
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { DisplayPOIScreen } from './screens/DisplayPOIScreen/DisplayPOIScreen';
import { DisplayEventScreen } from './screens/DisplayEventScreen/DisplayEventScreen';
import { DisplayTipScreen } from './screens/DisplayTipScreen/DisplayTipScreen';

import { NavBar } from './components/NavBarComponent/NavBar';
import { store } from './index';

export type AppDispatch = typeof store.dispatch;

function App() {
  return (
    <Router>
      <div className="App">
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
            <Link to="/viewEvent">View Event</Link>
          </li>
          <li>
            <Link to="/createTip">Create Tip</Link>
          </li>
          <li>
            <Link to="/viewTip">Tip Event</Link>
          </li>
        </ul>

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
          <Route path="/viewEvent">
            <DisplayEventScreen />
          </Route>
          <Route path="/createTip">
            <CreateTipScreen />
          </Route>
          <Route path="/viewTip">
            <DisplayTipScreen />
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
