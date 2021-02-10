import React from "react";
// import Map from "../../assets/images/map.png";
import "./POIImageComponent.css";

function POIImageComponent() {
  return (
    <div className="POIImageContainer">
      {/* <img src={Map} alt="map graphic" /> */}
      <div className="POIInformationText">
        <h3 className="POITitleName">PostgreSQL Party</h3>
        <h3 className="POILocationName">23 Long Road, London, AB12 3CD</h3>
      </div>
      <div className="ratingInputContainer">
        <div className="rating">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
    </div>
  );
}

export default POIImageComponent;
