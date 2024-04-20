import { useState } from "react";

const DragAndDropImages = () => {

  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <div className="imageUploadContainer">
      {selectedImages.map(img => (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(img)}
          />
          <br />
          {console.log(selectedImages)}
          <button onClick={() => setSelectedImages(selectedImages.filter((keptImgs) => keptImgs !== img))}>Remove</button>
        </div>
      ))}
      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImages(selectedImages => [...selectedImages, ...event.target.files]);
        }}
      />
    </div>
  );
};


export default DragAndDropImages
