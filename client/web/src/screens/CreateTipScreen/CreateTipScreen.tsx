import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CreateTipScreen.css";
import UploadImageComponent from "../../components/UploadImageComponent/UploadImageComponent";
import { StarRating } from "../../components/StarComponent/StarComponent";
import { createReview } from "../../store/actions";
import { StandaloneSearchBox } from "@react-google-maps/api";

const mockArrayTags: string[] = ["food", "adventure", "mountain"];

const emptyTagsArray: string[] = [];

const emptyEventObject = {
  formattedAddress: "",
  latitude: 0,
  longitude: 0,
  budgetLevel: 5,
  title: "",
  description: "",
  rating: 5,
  safetyRating: 3,
  safetyComment: "",
  tags: emptyTagsArray,
};
const initalSearchBox: any = {};

export function CreateTipScreen() {
  const [tagInputValue, setTagInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState(emptyTagsArray);
  const [recommendedTags, setRecommendedTags] = useState(mockArrayTags);
  const [reviewObject, setReviewObject] = useState(emptyEventObject);
  const [image, setImage] = useState<string>("");
  const [searchBox, setSearchBox] = useState(initalSearchBox);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewObject({ ...reviewObject, [name]: value });
  };

  useEffect(() => {
    setReviewObject({ ...reviewObject, tags: selectedTags });
  }, [selectedTags]);

  const dispatch = useDispatch();

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    e.preventDefault();
    dispatch(
      createReview(
        reviewObject.title,
        reviewObject.description,
        reviewObject.rating,
        reviewObject.budgetLevel,
        reviewObject.safetyRating,
        reviewObject.safetyComment,
        reviewObject.formattedAddress,
        image,
        reviewObject.latitude,
        reviewObject.longitude,
        selectedTags
      )
    );
    console.log("selectedTags :>> ", selectedTags);
    console.log("eventObject :>> ", reviewObject);
    console.log(image);
  };

  const onLoad = (ref: any) => {
    if (ref) {
      setSearchBox(ref);
    }
  };

  const onPlacesChanged = () => {
    const item = searchBox.getPlaces()[0];

    const newFormattedAddress = item.formatted_address;
    const newLat = item.geometry.location.lat();
    const newLng = item.geometry.location.lng();

    setReviewObject({
      ...reviewObject,
      formattedAddress: newFormattedAddress,
      latitude: newLat,
      longitude: newLng,
    });
  };

  const handleRecommendedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    addTagtoSelected(tag);
  };

  const handleSelectedTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    removeTagFromSelected(tag);
  };

  const handleAddUserTag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newTag = tagInputValue;
    addTagtoSelected(newTag);
    setTagInputValue("");
  };
  const addTagtoSelected = (tag: string) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
    setRecommendedTags((prevTags) => prevTags.filter((el) => el !== tag));
  };
  const removeTagFromSelected = (tag: string) => {
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
            placeholder="Title"
            onChange={handleInputChange}
            value={reviewObject.title}
          />
        </div>

        <div className="locationInputContainer">
          <label className="eventScreenLabel">Location</label>
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="formInput"
              type="text"
              placeholder="Location"
            ></input>
          </StandaloneSearchBox>
        </div>

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
                {tag}
              </button>
            ))}
          </div>

          <div className="tagsContainer">
            {recommendedTags.map((tag) => (
              <button
                onClick={(e) => handleRecommendedTagClick(e, tag)}
                className="tagButton"
              >
                {tag}
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
            value={reviewObject.description}
          />
        </div>

        <div className="descriptionInputContainer">
          <label className="eventScreenLabel">Safety Comment</label>
          <textarea
            onChange={handleInputChange}
            className="descriptionInputContainer"
            name="safetyComment"
            cols={40}
            rows={5}
            value={reviewObject.safetyComment}
          />
        </div>

        <div className="priceLevelInputContainer">
          <div className="rating">
            <p>Safety Rating</p>
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
