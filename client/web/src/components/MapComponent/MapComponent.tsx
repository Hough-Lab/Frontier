import React, { useEffect, CSSProperties } from 'react';

import './MapComponent.css';

import { GoogleKey } from '../../googleConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface IProps {
  style: CSSProperties;
}

var map: google.maps.Map<HTMLElement>;
var marker: google.maps.Marker;

const MapComponent = ({ style }: IProps) => {
  const userCoordinates = useSelector((state: RootState) => state.coordinates);
  function initMap(): void {
    map = new window.google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: userCoordinates,
        zoom: 9,
        streetViewControl: false,
      },
    );
    //
    console.log(userCoordinates);
    // Center map to user's position.
    map.panTo(userCoordinates);
    marker = new window.google.maps.Marker({
      position: userCoordinates,
      map,
      title: 'Hello World!',
    });

    marker.setMap(map);
  }
  useEffect(() => {
    console.log('GoogleKey :>> ', GoogleKey);
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      initMap();
    });
  }, []);

  useEffect(() => {
    marker.setPosition(userCoordinates);
    map.panTo(userCoordinates);
  }, [userCoordinates]);

  return (
    <div style={style} id="mapContainer">
      <div id="map" />
    </div>
  );
};
export default MapComponent;
