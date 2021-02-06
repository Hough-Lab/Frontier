import React, { useState } from 'react';
import './NavBar.css';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BiSelectMultiple } from 'react-icons/bi';

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
        <RiCalendarEventFill className="myReact-icons" size={50} />
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
        <BiSelectMultiple className="myReact-icons" size={50} />
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
