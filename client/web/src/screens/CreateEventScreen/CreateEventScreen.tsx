import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import { handleImageUpload } from '../../components/UploadImageComponent/UploadImageComponent';
// import LocationAutoCompleteInput from '../../components/LocationAutoCompleteInput/LocationAutoCompleteInput';
import './CreateEventScreen.css';

interface Tag {
  reviewTagId: number;
  tagName: string;
}

let mockArrayTags: Tag[] = [
  { reviewTagId: 1, tagName: 'Food' },
  { reviewTagId: 2, tagName: 'Adventure' },
  { reviewTagId: 3, tagName: 'Nature' },
];

const emptyTagsArray: Tag[] = [];

export const CreateEventScreen = () => {
  const [inputValues, setInputValues] = useState({ title: '', location: '' });
  const [tagInputValue, setTagInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState(emptyTagsArray);
  const [recommendedTags, setRecommendedTags] = useState(mockArrayTags);

  const dispatch = useDispatch();

  const handleSubmit = () => {};

  const handleRecommendedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: Tag,
  ) => {
    e.preventDefault();
    addTagtoSelected(tag);
  };

  const handleSelectedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: Tag,
  ) => {
    e.preventDefault();
    removeTagFromSelected(tag);
  };

  const handleAddUserTag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const newTag = {
      reviewTagId: 4,
      tagName: tagInputValue,
    };
    addTagtoSelected(newTag);
    setTagInputValue('');
  };

  const addTagtoSelected = (tag: Tag) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
    setRecommendedTags((prevTags) => prevTags.filter((el) => el !== tag));
    console.log('selectedTags :>> ', selectedTags);
    console.log('recommendedTags :>> ', recommendedTags);
  };

  const removeTagFromSelected = (tag: Tag) => {
    setRecommendedTags((prevTags) => [...prevTags, tag]);
    setSelectedTags((prevTags) => prevTags.filter((el) => el !== tag));
    console.log('selectedTags :>> ', selectedTags);
    console.log('recommendedTags :>> ', recommendedTags);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
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

        <div className="tagSelectionContainer">
          <label className="eventScreenLabel">Tags:</label>
          <input
            onChange={handleTagInputChange}
            value={tagInputValue}
            type="text"
            name="Tags"
            placeholder="Input Tags"
          />
          <button onClick={(e) => handleAddUserTag(e)}>+</button>

          <div className="tagsContainer">
            {selectedTags.map((tag) => (
              <button
                onClick={(e) => handleSelectedTagClick(e, tag)}
                className="tagButton selectedTag"
              >
                {tag.tagName}
              </button>
            ))}
          </div>

          <div className="tagsContainer">
            {recommendedTags.map((tag) => (
              <button
                onClick={(e) => handleRecommendedTagClick(e, tag)}
                className="tagButton"
              >
                {tag.tagName}
              </button>
            ))}
          </div>
        </div>
        <div className="dateInputContainer">
          <label className="eventScreenLabel">From:</label>
          <input className="textInput" type="datetime-local" name="EventDate" />
          <label className="eventScreenLabel">To:</label>
          <input className="textInput" type="datetime-local" name="EventDate" />
        </div>

        <div className="selectPrivateEventContainer">
          <input
            className="textInput"
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
          <button className="shareButton" onClick={handleSubmit}>
            Share
          </button>
        </div>
      </form>
    </div>
  );
};
