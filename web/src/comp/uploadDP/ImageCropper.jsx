// ImageCropper.js
import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ image, onCrop, onCancel }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (image && cropperRef.current) {
      cropperRef.current.cropper.replace(image);
    }
  }, [image]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      onCrop(croppedDataUrl); // Send the cropped image to the parent component
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Cropper
        src={image}
        style={{ height: "400px", width: "100%" }}
        initialAspectRatio={1}
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
      />
      <div className="flex mt-4 space-x-4">
        <button
          onClick={handleCrop}
          className="bg-blue-500 text-white rounded-md py-2 px-4"
        >
          Crop
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white rounded-md py-2 px-4"
        >
          Cancel
        </button>
      </div>
      {croppedImage && (
        <div className="mt-4">
          <h3>Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped Preview" className="max-w-lg rounded-md" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
