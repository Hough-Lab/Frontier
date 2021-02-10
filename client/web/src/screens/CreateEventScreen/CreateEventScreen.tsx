import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEvent, getAllPOI } from "../../store/actions";
import UploadImageComponent from "../../components/UploadImageComponent/UploadImageComponent";
import { StandaloneSearchBox } from "@react-google-maps/api";

import "./CreateEventScreen.css";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

let mockArrayTags: string[] = ["Food", "Adventure", "Nature"];

const emptyTagsArray: string[] = [];

const emptyEventObject = {
  title: "",
  formattedAddress: "",
  latitude: 0,
  longitude: 0,
  dateFrom: "",
  dateTo: "",
  description: "",
  maxCapacity: 10,
  isPrivate: false,
  picture: "",
  tags: emptyTagsArray,
};
const initalSearchBox: any = {};
export const CreateEventScreen = () => {
  const [inputValues, setInputValues] = useState({ title: "", location: "" });
  const [tagInputValue, setTagInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState(emptyTagsArray);
  const [recommendedTags, setRecommendedTags] = useState(mockArrayTags);
  const [eventObject, setEventObject] = useState(emptyEventObject);
  const [searchBox, setSearchBox] = useState(initalSearchBox);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventObject({ ...eventObject, [name]: value });
  };

  const handleImageChange = (e: HTMLInputEvent) => {};

  useEffect(() => {
    setEventObject({ ...eventObject, tags: selectedTags });
  }, [selectedTags]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    e.preventDefault();
    await dispatch(
      createEvent(
        eventObject.title,
        eventObject.formattedAddress,
        eventObject.latitude,
        eventObject.longitude,
        eventObject.dateFrom,
        eventObject.dateTo,
        eventObject.description,
        eventObject.maxCapacity,
        eventObject.isPrivate,
        image,
        eventObject.tags
      )
    );
    dispatch(getAllPOI());
  };

  const handleIsPrivateClick = () => {
    setEventObject({ ...eventObject, isPrivate: !eventObject.isPrivate });
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

    setEventObject({
      ...eventObject,
      formattedAddress: newFormattedAddress,
      latitude: newLat,
      longitude: newLng,
    });
  };

  // const handleSubmit = useCallback(() => {
  //   dispatch(createEvent(inputValues.title, inputValues.location));
  // }, [inputValues]);

  return (
    <div className="block">
      <div className="eventBlock">
        <div className="AddEvent">
          <h2> Create Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="photoUploadContainer">
              <label className="eventScreenLabel">Upload Photo</label>
              <UploadImageComponent setImage={setImage} />
            </div>

            <div className="titleInputContainer">
              <label className="eventScreenLabel">Event Name</label>
              <input
                name="title"
                className="textInput"
                type="text"
                placeholder="Type Event Name..."
                onClick={(text) => setInputValues({ ...inputValues })}
                onChange={handleInputChange}
                value={eventObject.title}
              />
            </div>
            <div className="locationInputContainer">
              <label className="eventScreenLabel">Location</label>
              <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  className="textInput"
                  type="text"
                  placeholder="Location"
                ></input>
              </StandaloneSearchBox>
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
            <div className="dateInputContainer">
              <label className="eventScreenLabel">From:</label>
              <input
                onChange={handleInputChange}
                name="dateFrom"
                className="textInput"
                type="datetime-local"
                value={eventObject.dateFrom}
              />
              <label className="eventScreenLabel">To:</label>
              <input
                onChange={handleInputChange}
                name="dateTo"
                className="textInput"
                type="datetime-local"
                value={eventObject.dateTo}
              />
            </div>

            <div className="descriptionInputContainer">
              <label className="eventScreenLabel">Description</label>
              <textarea
                onChange={handleInputChange}
                className="createEventTextArea"
                name="description"
                cols={40}
                rows={5}
                value={eventObject.description}
              />
            </div>
            <div className="selectPrivateEventContainer">
              <input
                onClick={() => handleIsPrivateClick()}
                className="textInput"
                type="checkbox"
                id="event"
                name="isPrivate"
                value="private"
              />
              <label className="eventScreenLabel" htmlFor="event">
                Private Event
              </label>
            </div>
            <div className="shareButtonContainer">
              <button type="submit" className="shareButton">
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = ({ event }: { event: Event }) => {
//   return { event };
// };

// export default connect(mapStateToProps, { createEvent })(CreateEventScreen);
