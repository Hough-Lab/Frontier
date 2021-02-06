import React from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';
// import { CreateEventScreen } from '../CreateEventScreen/CreateEventScreen';
import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className="homeContainer">
      {/* <div className="eventContainer">
        <CreateEventScreen />
      </div> */}
      <div className="mapContainer">
        <MapComponent />
      </div>
    </div>
  );
}

export default HomeScreen;
