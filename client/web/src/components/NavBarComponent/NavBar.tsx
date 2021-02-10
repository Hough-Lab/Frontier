import React from 'react';
import './NavBar.css';
import { useHistory } from 'react-router-dom';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BiSelectMultiple } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { MdStars } from 'react-icons/md';
import { TiHome } from 'react-icons/ti';

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
        <TiHome className="myReact-icons" size={50} />
        <div>Home</div>
      </button>
      <button
        onClick={() => toggleShowPointOfInterest()}
        className="navBarButton"
      >
        <MdStars className="myReact-icons" size={50} />
        <div>Point of Interest</div>
      </button>
      <button
        onClick={() => toggleShowCreateEvent()}
        className="navBarButton selected"
      >
        {' '}
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
        <FiLogOut className="myReact-icons" size={50} />
        <div>Logout</div>
      </button>
    </div>
  );
};

// onclick="myFunction(this)
