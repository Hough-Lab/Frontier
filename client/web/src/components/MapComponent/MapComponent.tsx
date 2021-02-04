import { GoogleKey } from '../../googleConfig';

import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

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
      lat: 41.3954,
      lng: 2.162,
    },
  },
  {
    name: 'Location 2',
    location: {
      lat: 41.3917,
      lng: 2.1649,
    },
  },
  {
    name: 'Location 3',
    location: {
      lat: 41.3773,
      lng: 2.1585,
    },
  },
  {
    name: 'Location 4',
    location: {
      lat: 41.3797,
      lng: 2.1682,
    },
  },
  {
    name: 'Location 5',
    location: {
      lat: 41.4055,
      lng: 2.1915,
    },
  },
];

const MapComponent = () => {
  const initialPosition = { lat: 0, lng: 0 };
  const [currentPosition, setCurrentPosition] = useState(initialPosition);

  const success = (position: GeolocationPosition) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

<<<<<<< HEAD
  // useEffect(() => {
  //   marker.setPosition(userCoordinates);
  //   map.panTo(userCoordinates);
  // }, [userCoordinates]);
=======
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });
  // let initialState: Location = {};
  // const [selected, setSelected] = useState(initialState);

  // const onSelect = (item: Location) => {
  //   setSelected(item);
  // };

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };
>>>>>>> 13ca5533b07703f0d42bc0e5cdb8aa57a3772add

  return (
    <LoadScript googleMapsApiKey={GoogleKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true}
          />
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapComponent;

{
  /* <Marker
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
          >
            <p>{selected.name}</p>
          </InfoWindow> */
}
