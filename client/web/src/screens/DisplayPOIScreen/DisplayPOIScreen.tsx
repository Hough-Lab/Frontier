import React, { useState } from "react";
import POIImageComponent from "../../components/POIImageComponent/POIImageComponent";
import FullEventsList from "../../components/FullEventsList/FullEventsList";
import FullTipsList from "../..//components/FullTipsList/FullTipsList";
import "./DisplayPOIScreen.css";

export const DisplayPOIScreen = () => {
  const [showEventsTab, setShowEventsTab] = useState(true);

  return (
    <div className="AddEvent">
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
      Event or Tips LIST section
      <div className="eventOrTipsViewContainer">
        {showEventsTab ? <FullEventsList /> : <FullTipsList />}
      </div>
    </div>
  );
};
