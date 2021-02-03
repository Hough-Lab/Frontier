import React, { useState, useEffect, useRef } from "react";
import "./LocationAutoCompleteInput.css";
import { GoogleKey } from "../../googleConfig";

let autoComplete;
let setChosenLocation;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, setChosenLocation) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
  );
  autoComplete.setFields([
    "address_components",
    "formatted_address",
    "geometry",
  ]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, setChosenLocation)
  );
}

async function handlePlaceSelect(updateQuery, setChosenLocation) {
  const addressObject = autoComplete.getPlace();
  console.log("address Object =>> ", addressObject);

  const query = addressObject.formatted_address;
  updateQuery(query);
  if (typeof addressObject !== "undefined") {
    const chosenLocation = {
      query,
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    };
    setChosenLocation(chosenLocation);
  }
}

function LocationAutoCompleteInput({ placeholder }) {
  const [query, setQuery] = useState("");
  const [chosenLocation, setChosenLocation] = useState({});
  const autoCompleteRef = useRef(null);
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef, setChosenLocation)
    );
  }, [autoCompleteRef]);
  return (
    <div>
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        value={query}
      />
      <div>{chosenLocation.query}</div>
      <div>{chosenLocation.lat}</div>
      <div>{chosenLocation.lng}</div>
    </div>
  );
}
export default LocationAutoCompleteInput;
