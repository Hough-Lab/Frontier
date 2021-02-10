import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CreateTipScreen.css";
import UploadImageComponent from "../../components/UploadImageComponent/UploadImageComponent";
import { StarRating } from "../../components/StarComponent/StarComponent";

interface Tag {
  reviewTagId: number;
  tagName: string;
}

const mockArrayTags: Tag[] = [
  { reviewTagId: 1, tagName: "Food" },
  { reviewTagId: 2, tagName: "Adventure" },
  { reviewTagId: 3, tagName: "Nature" },
];

const emptyTagsArray: Tag[] = [];

const emptyEventObject = {
  reviewId: "fakeEventId",
  createdAt: "fakeTime",
  budgetLevel: 5,
  title: "",
  description: "",
  rating: 5,
  safetyRating: 3,
  safetyComment: "",
  picture: "",
  pointOfInterestId: "fakePointId",
  tags: emptyTagsArray,
};

export function CreateTipScreen() {
  const [inputValues, setInputValues] = useState({ title: "", location: "" });
  const [tagInputValue, setTagInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState(emptyTagsArray);
  const [recommendedTags, setRecommendedTags] = useState(mockArrayTags);
  const [eventObject, setEventObject] = useState(emptyEventObject);
  const [image, setImage] = useState("");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventObject({ ...eventObject, [name]: value });
  };

  useEffect(() => {
    setEventObject({ ...eventObject, tags: selectedTags });
  }, [selectedTags]);

  const dispatch = useDispatch();

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    e.preventDefault();
    console.log("selectedTags :>> ", selectedTags);
    console.log("eventObject :>> ", eventObject);
  };

  const handleRecommendedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: Tag
  ) => {
    e.preventDefault();
    addTagtoSelected(tag);
  };

  const handleSelectedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: Tag
  ) => {
    e.preventDefault();
    removeTagFromSelected(tag);
  };

  const handleAddUserTag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newTag = {
      reviewTagId: 4,
      tagName: tagInputValue,
    };
    addTagtoSelected(newTag);
    setTagInputValue("");
  };

  const addTagtoSelected = (tag: Tag) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
    setRecommendedTags((prevTags) => prevTags.filter((el) => el !== tag));
  };

  const removeTagFromSelected = (tag: Tag) => {
    setRecommendedTags((prevTags) => [...prevTags, tag]);
    setSelectedTags((prevTags) => prevTags.filter((el) => el !== tag));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  return (
    <div className="AddEvent">
      <h2>Create Travel Tip</h2>
      <form onSubmit={handleSubmit}>
        <div className="photoUploadContainer">
          <label className="eventScreenLabel">Upload Photo</label>
          <UploadImageComponent setImage={setImage} />
        </div>

        <div className="titleInputContainer">
          <label className="eventScreenLabel">Tip Name</label>
          <input
            className="formInput"
            name="title"
            type="text"
            placeholder="Type Event Name..."
            onClick={(text) => setInputValues({ ...inputValues })}
            onChange={handleInputChange}
            value={eventObject.title}
          />
        </div>

        {/*//TODO check if location is need or it is linked with point of interest if so add auto location api google
        <div className="locationInputContainer">
          <label className="eventScreenLabel">Location</label>
 

        <input
            onChange={handleInputChange}
            name="location"
            className="textInput"
            type="text"
            placeholder="Location"
            value={eventObject.location}
          ></input>
        </div> */}

        <div className="tagSelectionContainer">
          <label className="eventScreenLabel">Tags:</label>
          <input
            className="formInput"
            onChange={handleTagInputChange}
            value={tagInputValue}
            type="text"
            name="Tags"
            placeholder="Input Tags"
          />
          <button
            className="tagsAddButton"
            onClick={(e) => handleAddUserTag(e)}
          >
            +
          </button>

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
        <div className="descriptionInputContainer">
          <label className="eventScreenLabel">Description</label>
          <textarea
            onChange={handleInputChange}
            className="descriptionInputContainer"
            name="description"
            cols={40}
            rows={5}
            value={eventObject.description}
          />
        </div>

        <div className="descriptionInputContainer">
          <label className="eventScreenLabel">Saftey Comment</label>
          <textarea
            onChange={handleInputChange}
            className="descriptionInputContainer"
            name="description"
            cols={40}
            rows={5}
            value={eventObject.safetyComment}
          />
        </div>

        <div className="priceLevelInputContainer">
          <div className="rating">
            <p>saftey rating</p>
            <span>$</span>
            <span>$</span>
            <span>$</span>
          </div>
        </div>

        <div className="ratingInputContainer">
          <div className="rating">
            <StarRating totalStars={5} />
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
          <button type="submit" className="shareButton">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}
