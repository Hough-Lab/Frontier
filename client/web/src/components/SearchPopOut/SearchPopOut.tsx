import React, { useState } from "react";
import "./SearchPopOut.css";
import { FaSearchLocation } from "react-icons/fa";

import { StandaloneSearchBox } from "@react-google-maps/api";

interface position {
  lat: number;
  lng: number;
}

interface IProps {
  handleUpdateMapCenter: handleUpdateMapCenter;
}
interface handleUpdateMapCenter {
  (coordinates: position): void;
}
const initalSearchBox: any = {};

export const SearchPopOut = ({ handleUpdateMapCenter }: IProps) => {
  // const [showSearchPopout, setSearchPopout] = useState(false);
  const [searchBox, setSearchBox] = useState(initalSearchBox);

  const onLoad = (ref: any) => {
    if (ref) {
      setSearchBox(ref);
    }
  };

  const onPlacesChanged = () => {
    const item = searchBox.getPlaces()[0];

    const formattedAddress = item.formatted_address;
    console.log("Formatted Address: ", formattedAddress);

    const position = {
      lat: item.geometry.location.lat(),
      lng: item.geometry.location.lng(),
    };
    handleUpdateMapCenter(position);
  };

  // const toggleShowSearchPopout = () => {
  //   setSearchPopout((showSearchPopout) => !showSearchPopout);

  return (
    <div className="SearchPopOutContainer">
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          className="searchBoxInput"
          type="text"
          placeholder="Customized your placeholder"
        />
      </StandaloneSearchBox>
    </div>
  );
};

// {
//   /* <button className="searchBarButton">
//         onClick=
//         {() => {
//           toggleShowSearchPopout();
//         }}
//         <FaSearchLocation className="myReact-icons" size={50} />
//       </button>  */
// }
