import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import { handleImageUpload } from '../../components/UploadImageComponent/UploadImageComponent';
// import LocationAutoCompleteInput from '../../components/LocationAutoCompleteInput/LocationAutoCompleteInput';
import './CreateEventScreen.css';

const mockArrayTags = ['Food', 'Adventure', 'Nature'];

export const CreateEventScreen = () => {
  const [inputValues, setInputValues] = useState({ title: '', location: '' });

  const dispatch = useDispatch();

  const handleSubmit = () => {};

  // const handleSubmit = useCallback(() => {
  //   dispatch(createEvent(inputValues.title, inputValues.location));
  // }, [inputValues]);

  return (
    <div className="createEventContainer">
      <div className="AddEvent">
        <h2> Create Event</h2>
        <form>
          <div className="photoUploadContainer">
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onClick={handleImageUpload}
              multiple={false}
            />
          </div>

          <div className="titleInputContainer">
            <label>Event Name</label>
            <input
              type="text"
              name="EventName"
              placeholder="Type Event Name..."
              onClick={(text) => setInputValues({ ...inputValues })}
            />
          </div>
          <div className="locationInputContainer">
            <label>Location</label>
            <input
              type="text"
              name="LocationName"
              placeholder="Location"
            ></input>
          </div>
          {/* <div className="locationInputContainer">
            <label>Location</label>
             <LocationAutoCompleteInput placeholder="Location" /> 
          </div> */}

          <div className="tagSelectionContainer">
            <label>Tags:</label>
            <input type="text" name="Tags" placeholder="Input Tags" />
            <div className="suggestedTagsContainer">
              {mockArrayTags.map((tag) => (
                <button className="suggestedTagButton">{tag}</button>
              ))}
            </div>
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
          <div className="shareButtonContainer">
            <button className="shareButton" onClick={handleSubmit}>
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// const mapStateToProps = ({ event }: { event: Event }) => {
//   return { event };
// };

// export default connect(mapStateToProps, { createEvent })(CreateEventScreen);
