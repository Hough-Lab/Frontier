import React, { useState, useEffect } from 'react';
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

const emptyEventObject = {
  title: '',
  eventId: 'fakeEventId',
  pointOfInterestId: 'fakePointId',
  dateFrom: '',
  dateTo: '',
  description: '',
  createdBy: 'fakeUserId',
  maxCapacity: 10,
  isPrivate: false,
  picture: '',
  location: '',
  tags: emptyTagsArray,
};

export const CreateEventScreen = () => {
  const [inputValues, setInputValues] = useState({ title: '', location: '' });
  const [tagInputValue, setTagInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState(emptyTagsArray);
  const [recommendedTags, setRecommendedTags] = useState(mockArrayTags);
  const [eventObject, setEventObject] = useState(emptyEventObject);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventObject({ ...eventObject, [name]: value });
  };

  useEffect(() => {
    setEventObject({ ...eventObject, tags: selectedTags });
  }, [selectedTags]);

  const dispatch = useDispatch();

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
  ) => {
    e.preventDefault();
    console.log('selectedTags :>> ', selectedTags);
    console.log('eventObject :>> ', eventObject);
  };

  const handleIsPrivateClick = () => {
    setEventObject({ ...eventObject, isPrivate: !eventObject.isPrivate });
  };

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
  };

  const removeTagFromSelected = (tag: Tag) => {
    setRecommendedTags((prevTags) => [...prevTags, tag]);
    setSelectedTags((prevTags) => prevTags.filter((el) => el !== tag));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
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
              <input
                name="picture"
                type="file"
                accept="image/*"
                onClick={handleImageUpload}
                multiple={false}
                onChange={handleInputChange}
              />
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
              <input
                onChange={handleInputChange}
                name="location"
                className="textInput"
                type="text"
                placeholder="Location"
                value={eventObject.location}
              ></input>
            </div>
            {/* <div className="locationInputContainer">
            <label>Location</label>
            <LocationAutoCompleteInput placeholder="Location" /> 
          </div> */}

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
