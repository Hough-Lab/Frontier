import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import { handleImageUpload } from '../../components/UploadImageComponent/UploadImageComponent';
// import LocationAutoCompleteInput from '../../components/LocationAutoCompleteInput/LocationAutoCompleteInput';
import './CreateEventScreen.css';

interface Tag {
  reviewTagId: number;
  tagName: string;
}

const mockArrayTags: Tag[] = [
  { reviewTagId: 1, tagName: 'Food' },
  { reviewTagId: 2, tagName: 'Adventure' },
  { reviewTagId: 3, tagName: 'Nature' },
];

const selectedTags: Object[] = [];

export const CreateEventScreen = () => {
  const [inputValues, setInputValues] = useState({ title: '', location: '' });

  const dispatch = useDispatch();

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: Tag,
  ) => {
    e.preventDefault();
    addTagtoSelected(tag);
  };

  const addTagtoSelected = (tag: Tag) => {
    selectedTags.push(tag);
    console.log('selectedTags :>> ', selectedTags);
  };

  // const handleSubmit = useCallback(() => {
  //   dispatch(createEvent(inputValues.title, inputValues.location));
  // }, [inputValues]);

  return (
    <div className="AddEvent">
      <h2> Create Event</h2>
      <form>
        <div className="photoUploadContainer">
          <label className="eventScreenLabel">Upload Photo</label>
          <input
            className="formInput"
            type="file"
            accept="image/*"
            onClick={handleImageUpload}
            multiple={false}
          />
        </div>

        <div className="titleInputContainer">
          <label className="eventScreenLabel">Event Name</label>
          <input
            className="formInput"
            type="text"
            name="EventName"
            placeholder="Type Event Name..."
            onClick={(text) => setInputValues({ ...inputValues })}
          />
        </div>
        <div className="locationInputContainer">
          <label className="eventScreenLabel">Location</label>
          <input
            className="formInput"
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
          <label className="eventScreenLabel">Tags:</label>
          <input
            className="formInput"
            type="text"
            name="Tags"
            placeholder="Input Tags"
          />
          <div className="suggestedTagsContainer">
            {mockArrayTags.map((tag) => (
              <button
                onClick={(e) => handleTagClick(e, tag)}
                className="suggestedTagButton"
              >
                {tag.tagName}
              </button>
            ))}
          </div>
        </div>
        <div className="dateInputContainer">
          <label className="eventScreenLabel">From:</label>
          <input className="formInput" type="datetime-local" name="EventDate" />
          <label className="eventScreenLabel">To:</label>
          <input className="formInput" type="datetime-local" name="EventDate" />
        </div>

        <div className="selectPrivateEventContainer">
          <input
            className="formInput"
            type="checkbox"
            id="event"
            name="isEventPrivate"
            value="private"
          />
          <label className="eventScreenLabel" htmlFor="event">
            Private Event
          </label>
        </div>
        <div className="descriptionInputContainer">
          <label className="eventScreenLabel">Description</label>
          <textarea
            className="createEventTextArea"
            name="description"
            cols={40}
            rows={5}
          />
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
          <button className="shareButton">Share</button>
        </div>
      </form>
    </div>
  );
};

// const mapStateToProps = ({ event }: { event: Event }) => {
//   return { event };
// };

// export default connect(mapStateToProps, { createEvent })(CreateEventScreen);
