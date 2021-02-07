import React from 'react';
// import LocationAutoCompleteInput from '../../components/LocationAutoCompleteInput/LocationAutoCompleteInput';
import './CreateTipScreen.css';
// import { handleTagClick } from '../CreateEventScreen/CreateEventScreen';

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

const handleImageUpload = () => {
  console.log('Image Upload');
  // const image = document.createElement("img");
  //image.src = URL.createObjectURL();
  // <div className="selectedPhotoOutput">{photo}</div>
};

export function CreateTipScreen() {
  const handleSubmit = () => {};

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
  return (
    <div className="AddEvent">
      <h2>Create Travel Tip</h2>
      <form>
        <div className="photoUploadContainer">
          <label className="eventScreenLabel">Upload Photo</label>
          <input
            className="textInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple={false}
          />
        </div>

        <div className="titleInputContainer">
          <label className="eventScreenLabel">Tip Name</label>
          <input
            className="textInput"
            type="text"
            name="TipName"
            placeholder="Type Tip Name..."
          />
        </div>
        <div className="locationInputContainer">
          <label className="eventScreenLabel">Location</label>
          {/* <LocationAutoCompleteInput placeholder="Location" /> */}
        </div>
        <div className="tagSelectionContainer">
          <label className="eventScreenLabel">Tags:</label>
          <input type="text" name="Tags" placeholder="Input Tags" />
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
        <div className="descriptionInputContainer">
          <label className="eventScreenLabel">Description</label>
          <textarea
            className="createTipTextArea"
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
}
