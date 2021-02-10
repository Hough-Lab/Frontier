import React, { useState } from "react";
import MapComponent from "../../components/MapComponent/MapComponent";
import { CreateEventScreen } from "../CreateEventScreen/CreateEventScreen";
import { CreateTipScreen } from "../CreateTipScreen/CreateTipScreen";
import { DisplayPOIScreen } from "../DisplayPOIScreen/DisplayPOIScreen";
import { NavBar } from "../../components/NavBarComponent/NavBar";
import "./HomeScreen.css";

function HomeScreen() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateTip, setShowCreateTip] = useState(false);
  const [showPointOfInterest, setShowPointOfInterest] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(true);

  const toggleShowCreateEvent = () => {
    setShowCreateEvent((showCreateEvent) => !showCreateEvent);
    setShowCreateTip(false);
    setShowPointOfInterest(false);
    setShowHomeButton(false);
  };

  const toggleShowCreateTip = () => {
    setShowCreateTip((showCreateTip) => !showCreateTip);
    setShowCreateEvent(false);
    setShowPointOfInterest(false);
    setShowHomeButton(false);
  };

  const toggleShowPointOfInterest = () => {
    setShowPointOfInterest((showPointOfInterest) => !showPointOfInterest);
    setShowCreateTip(false);
    setShowCreateEvent(false);
    setShowHomeButton(false);
  };

  const toggleHomeButtonPressed = () => {
    setShowHomeButton((showHomeButton) => !showHomeButton);
    setShowCreateEvent(false);
    setShowCreateTip(false);
    setShowPointOfInterest(false);
  };

  return (
    <div className="extendedHomeContainer">
      <NavBar
        toggleShowCreateEvent={toggleShowCreateEvent}
        toggleShowCreateTip={toggleShowCreateTip}
        toggleShowPointOfInterest={toggleShowPointOfInterest}
        toggleHomeButtonPressed={toggleHomeButtonPressed}
        showCreateEvent={showCreateEvent}
        showCreateTip={showCreateTip}
        showPointOfInterest={showPointOfInterest}
        showHomeButton={showHomeButton}
      />
      <div className="homeContainer">
        {showCreateEvent && (
          <div className="eventContainer">
            <CreateEventScreen />
          </div>
        )}
        {showCreateTip && (
          <div className="eventContainer">
            <CreateTipScreen />
          </div>
        )}
        {showPointOfInterest && (
          <div className="eventContainer">
            <DisplayPOIScreen />
          </div>
        )}
        <div className="mapContainer">
          <MapComponent toggleShowPointOfInterest={toggleShowPointOfInterest} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
