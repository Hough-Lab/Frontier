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
  time?: string;
  image?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const locations = [
  {
    name: 'Lantern Festival',
    time: '07/02/2021, 20:00pm',
    image:
      'https://afar-production.imgix.net/uploads/images/afar_post_headers/images/1YsKTV9Ksc/original_lantern-festival-floating.jpg?auto=compress,format&fit=crop&crop=top&lossless=true&w=1080',

    location: {
      lat: 51.4626,
      lng: -0.2163,
    },
  },
  {
    name: 'Free Cocktail Class',
    time: '11/02/2021, 12:00pm',
    image:
      'https://afar-production.imgix.net/uploads/images/afar_post_headers/images/1YsKTV9Ksc/original_lantern-festival-floating.jpg?auto=compress,format&fit=crop&crop=top&lossless=true&w=1080',
    location: {
      lat: 51.4628,
      lng: -0.215,
    },
  },
  {
    name: 'Park 5km',
    time: '20/02/2021, 10:00am',
    image:
      'https://afar-production.imgix.net/uploads/images/afar_post_headers/images/1YsKTV9Ksc/original_lantern-festival-floating.jpg?auto=compress,format&fit=crop&crop=top&lossless=true&w=1080',
    location: {
      lat: 51.4634,
      lng: -0.2167,
    },
  },
];

const MapComponent = () => {
  const initialPosition = { lat: 51.46262, lng: -0.2143 };
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
    height: '100%',
    width: '100%',
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
          >
            <div className="infoWindowBody">
              <img
                src={selected.image}
                // src="https://afar-production.imgix.net/uploads/images/afar_post_headers/images/1YsKTV9Ksc/original_lantern-festival-floating.jpg?auto=compress,format&fit=crop&crop=top&lossless=true&w=1080"
                alt="lantern festival"
                height={100}
                width={150}
              ></img>
              <p>{selected.name}</p>
              <p>{selected.time}</p>
            </div>
          </InfoWindow>
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
