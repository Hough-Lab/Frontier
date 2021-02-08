import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';
import { CreateEventScreen } from '../CreateEventScreen/CreateEventScreen';
import { CreateTipScreen } from '../CreateTipScreen/CreateTipScreen';
import { DisplayPOIScreen } from '../DisplayPOIScreen/DisplayPOIScreen';
import { NavBar } from '../../components/NavBarComponent/NavBar';
import './HomeScreen.css';

function HomeScreen() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateTip, setShowCreateTip] = useState(false);
  const [showPointOfInterest, setShowPointOfInterest] = useState(false);

  const toggleShowCreateEvent = () => {
    setShowCreateEvent((showCreateEvent) => !showCreateEvent);
    setShowCreateTip(false);
    setShowPointOfInterest(false);
  };

  const toggleShowCreateTip = () => {
    setShowCreateTip((showCreateTip) => !showCreateTip);
    setShowCreateEvent(false);
    setShowPointOfInterest(false);
  };

  const toggleShowPointOfInterest = () => {
    setShowPointOfInterest((showPointOfInterest) => !showPointOfInterest);
    setShowCreateTip(false);
    setShowCreateEvent(false);
  };

  const homeButtonPressed = () => {
    setShowCreateEvent(false);
    setShowCreateTip(false);
    setShowPointOfInterest(false);
    // setShowSearchPopout(false)
  };

  return (
    <div className="extendedHomeContainer">
      <NavBar
        toggleShowCreateEvent={toggleShowCreateEvent}
        toggleShowCreateTip={toggleShowCreateTip}
        toggleShowPointOfInterest={toggleShowPointOfInterest}
        homeButtonPressed={homeButtonPressed}
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
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
