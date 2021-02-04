import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const toggleShowCreateEvent = () => {
    setShowCreateEvent(true);
  };

  return (
    <div className="nav">
      <div className="burger">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className="menu">Menu</div>
      <div className="logout">Logout</div>
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
          <button
            className="navButton"
            type="button"
            onClick={() => toggleShowCreateEvent()}
          >
            Create Event
          </button>
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
    </div>
  );
};

// onclick="myFunction(this)
