// ImageUploadWithAuth.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import ImageCropper from "./ImageCropper";
const apiBase = process.env.REACT_APP_API;


const UploadDp = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [originalPreview, setOriginalPreview] = useState(""); // To store the original preview
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const base64ToFile = (base64Data, filename) => {
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      setOriginalPreview(previewUrl); // Save the original preview
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (!croppedImage) {
      setMessage("Please crop the image before uploading.");
      toast.error("Please crop the image before uploading.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", croppedImage); // Now croppedImage is a File object
    

    try {
      const token = localStorage.getItem("token"); // Replace with the actual JWT token
      const response = await axios.post(`${apiBase}/profile/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`, // Include the token in the headers
        },
      });

      setMessage("Image uploaded successfully!");
      toast.success("Image uploaded successfully!");
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setMessage(`${error.message}, please reload the page and try again!`);
      toast.error("Somthing went wrong! Please try gain later")
    }finally{
      setIsUploading(false);
    }
  };

  const handleCrop = (croppedDataUrl) => {
    const file = base64ToFile(croppedDataUrl, 'cropped_image.png'); // You can adjust the file extension if needed
    setCroppedImage(file);
    setPreview(croppedDataUrl);
    setIsCropping(false);
  };
  

  // Handle canceling crop
  const handleCancel = () => {
    setPreview(originalPreview); // Restore original preview
    setIsCropping(false); // Close cropper
  };

  return (
    <div style={{ padding: "40" }} className="flex flex-col items-center">
      <h2 className="font-semibold opacity-50 text-2xl">Upload Profile Image</h2>
      <form onSubmit={handleUpload} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
          className="my-8 rounded-md border"
        />
        <p className="text-gray-700">max: 500Kb</p>
        {preview && !isCropping && (
          <div>
            <p className="my-4 text-lg">Preview:</p>
            <img src={preview} alt="Preview" className="md:max-w-lg rounded-md" />
            <button
              onClick={() => setIsCropping(true)}
              className="mt-4 w-full rounded-md bg-myBlue py-2 px-4 text-white font-semibold hover:opacity-90"
            >
              Crop Image
            </button>
          </div>
        )}

        {isCropping && (
          <ImageCropper
            image={preview}
            onCrop={handleCrop} // Pass handleCrop to get cropped image
            onCancel={handleCancel} // Pass handleCancel to revert image
          />
        )}

        <button
        disabled = {isUploading}
          type="submit"
          style={{ marginTop: "30px" }}
          className="w-full mt-5 rounded-md bg-myBlue py-2 px-4 text-white font-semibold hover:opacity-90"
        >
          {
            !isUploading ? ("Upload") : ("uploading")
          }
        </button>
      </form>
      {/* {message && <p style={{ marginTop: "10px" }}>{message}</p>} */}
    </div>
  );
};

export default UploadDp;
