import { GoogleKey } from "../../googleConfig";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./MapComponent.css";
import { SearchPopOut } from "../../components/SearchPopOut/SearchPopOut";
import { POI, SystemState } from "../../interfaces/reducerInterfaces";
import { getAllPOI } from "../../store/actions";

interface MarkerInfo {
  pointOfInterestId: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}
const initialState: MarkerInfo = {
  pointOfInterestId: "",
  formattedAddress: "",
  latitude: 0,
  longitude: 0,
  createdAt: "",
  updatedAt: "",
};
interface position {
  lat: number;
  lng: number;
}

const MapComponent = () => {
  const initialPosition = { lat: 51.46262, lng: -0.2143 };

  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [selected, setSelected] = useState(initialState);

  const allPOI = useSelector((state: SystemState) => state.allPOI);
  console.log("allPOI: ", allPOI);

  const handleUpdateMapCenter = (coordinates: position) => {
    setCurrentPosition(coordinates);
  };

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

  const onSelect = (item: MarkerInfo) => {
    setSelected(item);
  };

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    dispatch(getAllPOI());
  }, []);

  return (
    <LoadScript googleMapsApiKey={GoogleKey} libraries={["places"]}>
      <SearchPopOut handleUpdateMapCenter={handleUpdateMapCenter} />

      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={currentPosition}
      >
        {Object.keys(allPOI)[0] !== "POI" &&
          Object.values(allPOI).map((POI) => {
            return (
              <Marker
                onClick={() => onSelect(POI)}
                key={POI.pointOfInterestId}
                position={{
                  lat: +POI.latitude,
                  lng: +POI.longitude,
                }}
                title={"PostgreSQL Party"}
                // description={'Descriptions go here'}
              />
            );
          })}

        {true && (
          <InfoWindow
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            onCloseClick={() => setSelected(initialState)}
            key={selected.pointOfInterestId}
          >
            <div className="infoWindowBody">
              <p>{selected.pointOfInterestId}</p>
              <p>{selected.formattedAddress}</p>
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
