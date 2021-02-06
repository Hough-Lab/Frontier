import React from 'react';
import './NavBar.css';
import { useHistory } from 'react-router-dom';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BiSelectMultiple } from 'react-icons/bi';

interface IProps {
  toggleShowCreateEvent: Function;
  toggleShowCreateTip: Function;
  toggleShowPointOfInterest: Function;
  homeButtonPressed: Function;
}

export const NavBar = ({
  toggleShowCreateEvent,
  toggleShowCreateTip,
  toggleShowPointOfInterest,
  homeButtonPressed,
}: IProps) => {
  const history = useHistory();

  const handleNavBarClick = (pathString: string) => {
    history.push(pathString);
  };

  return (
    <div className="nav">
      <button onClick={() => homeButtonPressed()} className="navBarButton">
        <div>Home</div>
      </button>
      <button
        onClick={() => toggleShowPointOfInterest()}
        className="navBarButton"
      >
        <div>Point of Interest</div>
      </button>
      <button
        onClick={() => toggleShowCreateEvent()}
        className="navBarButton selected"
      >
        <RiCalendarEventFill className="myReact-icons" size={50} />
        <div>Create Event</div>
      </button>
      <button onClick={() => toggleShowCreateTip()} className="navBarButton">
        <BiSelectMultiple className="myReact-icons" size={50} />
        <div>Create Travel Tip</div>
      </button>
      <button
        onClick={() => handleNavBarClick('/login')}
        className="navBarButton logout"
      >
        <div>Logout</div>
      </button>
    </div>
  );
};

// onclick="myFunction(this)
