import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { cloudinary_name, upload_preset } from "../../config";
import "./UploadImageComponent.css";
import "../../assets/images/placeholder.jpg";

interface Event<T = EventTarget> {
  target: T;
}

interface IProps {
  setImage: Dispatch<SetStateAction<string>>;
}

function UploadImageComponent({ setImage }: IProps) {
  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    fetch(`https://api.cloudinary.com/v1_1/${cloudinary_name}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.url);
      });
  };

  const handleImageChange = (e: Event<HTMLInputElement>) => {
    if (e.target.files === null) return;
    let file: File = e.target.files[0];
    uploadFile(file);
  };

  return (
    <input
      name="picture"
      type="file"
      accept="image/*"
      multiple={false}
      onChange={(e) => handleImageChange(e)}
    />
  );
}

export default UploadImageComponent;
