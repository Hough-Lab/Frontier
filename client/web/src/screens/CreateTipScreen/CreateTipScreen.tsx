// import React from "react";

// export function CreateTipScreen() {
//   return (
//     <div>
//       <h1>hey</h1>
//     </div>
//   );
// }

import React from "react";
import LocationAutoCompleteInput from "../../components/LocationAutoCompleteInput/LocationAutoCompleteInput";
import "./CreateTipScreen.css";

const mockArrayTags = ["Food", "Adventure", "Nature"];

const handleImageUpload = () => {
  console.log("Image Upload");
  // const image = document.createElement("img");
  //image.src = URL.createObjectURL();
  // <div className="selectedPhotoOutput">{photo}</div>
};

export function CreateTipScreen() {
  return (
    <div className="container">
      <div className="AddTip">
        <h2>Create Travel Tip</h2>
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
            <label>Tip Name</label>
            <input type="text" name="TipName" placeholder="Type Tip Name..." />
          </div>
          <div className="locationInputContainer">
            <label>Location</label>
            <LocationAutoCompleteInput placeholder="Location" />
          </div>
          <div className="tagSelectionContainer">
            <label>Tags:</label>
            <input type="text" name="Tags" placeholder="Input Tags" />
            {mockArrayTags.map((tag) => (
              <div className="tagOutput">{tag}</div>
            ))}
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
