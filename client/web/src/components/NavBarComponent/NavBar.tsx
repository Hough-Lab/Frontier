import React from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { RiCalendarEventFill } from "react-icons/ri";
import { BiSelectMultiple } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdStars } from "react-icons/md";
import { TiHome } from "react-icons/ti";

interface IProps {
  toggleShowCreateEvent: Function;
  toggleShowCreateTip: Function;
  toggleShowPointOfInterest: Function;
  toggleHomeButtonPressed: Function;
  showCreateEvent: boolean;
  showCreateTip: boolean;
  showPointOfInterest: boolean;
  showHomeButton: boolean;
}

export const NavBar = ({
  toggleShowCreateEvent,
  toggleShowCreateTip,
  toggleShowPointOfInterest,
  toggleHomeButtonPressed,
  showCreateEvent,
  showCreateTip,
  showPointOfInterest,
  showHomeButton,
}: IProps) => {
  const history = useHistory();

  const handleNavBarClick = (pathString: string) => {
    history.push(pathString);
  };

  return (
    <div className="nav">
      <div>
        <button
          onClick={() => toggleHomeButtonPressed()}
          className={
            showHomeButton ? "navBarButton homeSelected" : "navBarButton"
          }
        >
          <TiHome className="myReact-icons" size={50} />
          <div>Home</div>
        </button>
      </div>
      <div>
        <button
          onClick={() => toggleShowPointOfInterest()}
          className={
            showPointOfInterest ? "navBarButton selected" : "navBarButton"
          }
        >
          <MdStars className="myReact-icons" size={50} />
          <div>Point of Interest</div>
        </button>
      </div>
      <div>
        <button
          onClick={() => toggleShowCreateEvent()}
          className={showCreateEvent ? "navBarButton selected" : "navBarButton"}
        >
          {" "}
          <RiCalendarEventFill className="myReact-icons" size={50} />
          <div>Create Event</div>
        </button>
      </div>
      <div>
        <button
          onClick={() => toggleShowCreateTip()}
          className={showCreateTip ? "navBarButton selected" : "navBarButton"}
        >
          <BiSelectMultiple className="myReact-icons" size={50} />
          <div>Create Travel Tip</div>
        </button>
      </div>
      <div className="logout centered">
        <button
          onClick={() => handleNavBarClick("/login")}
          className="navBarButton"
        >
          <FiLogOut className="myReact-icons" size={50} />
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
};

// onclick="myFunction(this)
