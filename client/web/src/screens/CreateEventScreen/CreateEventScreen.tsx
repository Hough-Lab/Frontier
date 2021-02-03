import React from "react";
import LocationAutoCompleteInput from "../../components/LocationAutoCompleteInput/LocationAutoCompleteInput";
import "./CreateEventScreen.css";

const handleImageUpload = () => {
  console.log("Image Upload");
  // const image = document.createElement("img");
  // image.src = URL.createObjectURL(file);
  // <div className="selectedPhotoOutput">{photo}</div>
};

const mockArrayTags = ["Food", "Adventure", "Nature"];

export function CreateEventScreen() {
  return (
    <div className="container">
      <div className="AddEvent">
        <h2> Create Event</h2>
        <form>
          <div className="photoUploadContainer">
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple={false}
            />
          </div>

          <div className="titleInputContainer">
            <label>Event Name</label>
            <input
              type="text"
              name="EventName"
              placeholder="Type Event Name..."
            />
          </div>
          <div className="locationInputContainer">
            <label>Location</label>
            <LocationAutoCompleteInput placeholder="Location" />
          </div>

          <div className="tagSelectionContainer">
            <label>Tags:</label>
            <input type="text" name="Tags" placeholder="Input Tags" />
            {mockArrayTags.map((tag) => (
              <div>{tag}</div>
            ))}
          </div>
          <div className="dateInputContainer">
            <label>From:</label>
            <input type="datetime-local" name="EventDate" />
            <label>To:</label>
            <input type="datetime-local" name="EventDate" />
          </div>

          <div className="selectPrivateEventContainer">
            <input
              type="checkbox"
              id="event"
              name="isEventPrivate"
              value="private"
            />
            <label htmlFor="event">Private Event</label>
          </div>
          <div className="descriptionInputContainer">
            <label>Description</label>
            <textarea name="description" cols={40} rows={5} />
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
          <div className="priceLevelInputContainer">
            <div className="rating">
              <span>$</span>
              <span>$</span>
              <span>$</span>
            </div>
          </div>
          <button type="button">Share</button>
        </form>
      </div>
    </div>
  );
}
