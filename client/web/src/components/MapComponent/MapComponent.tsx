import { GoogleKey } from '../../googleConfig';

import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import './MapComponent.css';

interface Location {
  name?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const locations = [
  {
    name: 'Location 1',
    location: {
      lat: 51.4626,
      lng: -0.2163,
    },
  },
  {
    name: 'Location 2',
    location: {
      lat: 51.4628,
      lng: -0.215,
    },
  },
  {
    name: 'Location 3',
    location: {
      lat: 51.4634,
      lng: -0.2167,
    },
  },
];

const MapComponent = () => {
  const initialPosition = { lat: 0, lng: 0 };
  let initialState: Location = {};
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [selected, setSelected] = useState(initialState);

  const success = (position: GeolocationPosition) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  // const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
  //   const lat = e.latLng.lat();
  //   const lng = e.latLng.lng();
  //   setCurrentPosition({ lat, lng });
  // };

  const onSelect = (item: Location) => {
    setSelected(item);
  };

  const mapStyles = {
    height: '1000px',
    width: '1000px',
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <LoadScript googleMapsApiKey={GoogleKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={currentPosition}
      >
        {locations.map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
            />
          );
        })}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected({})}
            key={selected.name}
          ></InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

/* {currentPosition.lat ? (
    <Marker
      position={currentPosition}
      onDragEnd={(e) => onMarkerDragEnd(e)}
      draggable={true}
    />
  ) : null}  */
