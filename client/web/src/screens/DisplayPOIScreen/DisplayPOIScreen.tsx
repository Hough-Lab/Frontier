import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Event, Review, SystemState } from "../../interfaces/reducerInterfaces";
import POIImageComponent from "../../components/POIImageComponent/POIImageComponent";
import FullEventsList from "../../components/FullEventsList/FullEventsList";
import FullTipsList from "../..//components/FullTipsList/FullTipsList";
import "./DisplayPOIScreen.css";

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

export const DisplayPOIScreen = () => {
  const [showEventsTab, setShowEventsTab] = useState(true);
  const selectedPOIInfo: individualPOI = useSelector(
    (state: SystemState) => state.POI
  );

  const [eventsArray, setEventsArray] = useState(selectedPOIInfo?.events);
  const [reviewsArray, setReviewsArray] = useState(selectedPOIInfo?.reviews);

  useEffect(() => {
    setEventsArray(selectedPOIInfo?.events);
    setReviewsArray(selectedPOIInfo?.reviews);
  }, [selectedPOIInfo]);

  return (
    <div className="displayPOIContainer">
      <POIImageComponent />
      {/*Events and Tips buttons*/}
      <div className="eventTipsBtnsContainer">
        <button onClick={() => setShowEventsTab(true)} className="shareButton">
          Events
        </button>
        <button onClick={() => setShowEventsTab(false)} className="shareButton">
          Travel Tips
        </button>
      </div>
      <div className="eventOrTipsViewContainer">
        {showEventsTab ? (
          <FullEventsList eventsArray={eventsArray} />
        ) : (
          <FullTipsList reviewsArray={reviewsArray} />
        )}
      </div>
    </div>
  );
};
