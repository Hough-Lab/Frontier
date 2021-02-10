import React from 'react';
import POIImageComponent from '../../components/POIImageComponent/POIImageComponent';
import './DisplayPOIScreen.css';

export const DisplayPOIScreen = () => {
  // const [eventsTab, setEventsTab] = useState(true);
  return (
    <div className="AddEvent">
      <POIImageComponent />

      {/*Events and Tips buttons*/}
      <div className="eventTipsBtnsContainer">
        <button className="shareButton">
          {/* onClick={() => setEventsTab(true)} */}
          Events
        </button>
        <button className="shareButton">
          {/* onClick={() => setEventsTab(false)} */}
          Travel Tips
        </button>
      </div>

      {/* Event or Tips LIST section */}
      {/* <div className="eventOrTipsViewContainer">
        {eventsTab ? eventsListContainer : tipsListContainer}
      </div> */}
    </div>
  );
};
