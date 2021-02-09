import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPOIById } from "../../store/actions/POIActions";
import { Event, Review, SystemState } from "../../interfaces/reducerInterfaces";

import "./POIInfoWindow.css";

interface individualPOI {
  pointOfInterestId: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  events?: Event[];
  reviews?: Review[];
}

interface IProps {
  formattedAddress: string;
  pointOfInterestId: string;
  toggleShowPointOfInterest: Function;
}

function POIInfoWindow({
  formattedAddress,
  pointOfInterestId,
  toggleShowPointOfInterest,
}: IProps) {
  const selectedPOIInfo: individualPOI = useSelector(
    (state: SystemState) => state.POI
  );
  console.log("selectedPOIInfo in info window:>> ", selectedPOIInfo);
  const dispatch = useDispatch();

  //If error try useCallback as in create event dispatch
  const getPOIInfo = () => {
    dispatch(getPOIById(pointOfInterestId));
  };

  const eventsArray = selectedPOIInfo?.events;
  const reviewsArray = selectedPOIInfo?.reviews;

  useEffect(() => {
    getPOIInfo();
  }, [pointOfInterestId]);

  return (
    <div className="POIImageContainer">
      <h3 className="POITitleName">{formattedAddress}</h3>
      <div className="pointTagsContainer">
        <div>TagName</div>
        <div>TagName</div>
        <div>TagName</div>
      </div>

      <img
        alt="point of interest"
        src="https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg"
        height="300"
        width="300"
      />
      <div className="ratingInputContainer">
        <div className="rating">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
      <div className="POIInformationText">
        <div>10 Events happening at this location</div>
        <div> 32 Tips provided for this location</div>
      </div>
      <button onClick={() => toggleShowPointOfInterest()}>
        Show Me What's Happening
      </button>
    </div>
  );
}

export default POIInfoWindow;
