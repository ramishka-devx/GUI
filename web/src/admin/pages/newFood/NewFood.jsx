import React, { useState } from "react";
import axios from "axios";
import CategorySelect from "../../components/selectCategories/SelectCatogory";
import "./NewFood.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFood = () => {
  const [canteenId] = useState(localStorage.getItem("canteenId") || 1); 
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    price: "",
    status: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCategoryChange = (categoryId) => {
    setFormData({ ...formData, categoryId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryId", formData.categoryId);
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("status", formData.status);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:5369/admin/foods/new", // Adjust the API URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(response.data.message);
      toast.success(response.data.message);
      setErrorMessage("");
      setFormData({
        categoryId: "",
        title: "",
        price: "",
        status: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      setErrorMessage("Failed to add food. Please try again.");
      setSuccessMessage("");
      toast.error("Failed to add food. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add New Food</h2>

     
      <form onSubmit={handleSubmit} className="form">
        {/* Category Selector */}
        <CategorySelect canteenId={canteenId} onCategoryChange={handleCategoryChange} />

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        {/* Image */}
        <div className="form-group">
          <label htmlFor="image">Food Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
