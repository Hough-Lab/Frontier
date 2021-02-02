import React from "react";
import LocationAutoCompleteInput from "../../components/LocationAutoCompleteInput/LocationAutoCompleteInput";
import "./CreateEventScreen.css";

const handleImageUpload = () => {
  const image = document.createElement("img");
  image.src = URL.createObjectURL(file);
  // <div className="selectedPhotoOutput">{photo}</div>
};

const mockArrayTags = ["Food", "Adventure", "Nature"];

export function CreateEventScreen() {
  return (
    <div className="container">
      <div className="AddEvent">
        <h2> Create Event</h2>
        <form>
          <h4>Upload Photo</h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple={false}
          />
          <h4>Event Name</h4>
          <input
            type="text"
            name="EventName"
            placeholder="Type Event Name..."
          />
          <h4>Location</h4>

          <LocationAutoCompleteInput placeholder="Location" />
          <label>Tags:</label>
          <input type="text" name="Tags" placeholder="Input Tags" />
          {mockArrayTags.map((tag) => (
            <div>{tag}</div>
          ))}

          <h2>From:</h2>
          <input type="datetime-local" name="EventDate" />
          <h2>To:</h2>
          <input type="datetime-local" name="EventDate" />
          <div>
            <input
              type="checkbox"
              id="event"
              name="isEventPrivate"
              value="private"
            />
            <label htmlFor="event">Private Event</label>
          </div>
          <div>
            <label>Description</label>
          </div>
          <div>
            <textarea name="description" cols={40} rows={5} />
          </div>
          <div className="rating">
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
          </div>
          <button type="button">Share</button>
          <h3>Budget Level</h3>
        </form>
      </div>
    </div>
  );
}
