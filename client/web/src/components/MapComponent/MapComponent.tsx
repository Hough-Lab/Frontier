import React, { useEffect, CSSProperties } from "react";

import "./MapComponent.css";

import { GoogleKey } from "../../googleConfig";


interface IProps {
  userCoordinates: {
    lat: number;
    lng: number;
  };
  style: CSSProperties;
}

const MapComponent = ({ userCoordinates, style }: IProps) => {
  function initMap(): void {
    let map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: userCoordinates,
        zoom: 9,
        streetViewControl: false,
      }
    );
    //
    console.log(userCoordinates);
    // Center map to user's position.
    map.panTo(userCoordinates);
    new window.google.maps.Marker({
      position: userCoordinates,
      map,
      title: "Hello World!",
    });
  }
  useEffect(() => {
    console.log("GoogleKey :>> ", GoogleKey);
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      initMap();
    });
  }, []);

  return (
    <div style={style} id="mapContainer">
      <div id="map" />
    </div>
  );
};
export default MapComponent;
