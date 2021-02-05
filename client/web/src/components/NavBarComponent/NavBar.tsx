import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  // const [showCreateEvent, setShowCreateEvent] = useState(false);

  // const toggleShowCreateEvent = () => {
  //   setShowCreateEvent(true);
  // };

  return (
    <div className="nav">
      {/* <button className="navBarButton">
          <Link to="/login">Login</Link>
        </button>
        <button className="navBarButton">
          <Link to="/register">Register</Link>
        </button> */}

      <button className="navBarButton">
        <div>Home</div>
      </button>
      <button className="navBarButton">
        <div>Point of Interest</div>
      </button>
      <button className="navBarButton selected">
        <div>Create Event</div>
        {/* <button
            className="navButton"
            type="button"
            onClick={() => toggleShowCreateEvent()}
          >
            Create Event
          </button> */}
      </button>
      {/* <button className="navBarButton">
          <div to="/viewEvent">View Event</div>
        </button> */}
      <button className="navBarButton">
        <div>Create Travel Tip</div>
      </button>
      {/* <button className="navBarButton">
          <div to="/viewTip">View Travel Tip</div>
        </button> */}
      <button className="navBarButton logout">
        <div>Logout</div>
      </button>
    </div>
  );
};

// onclick="myFunction(this)
