import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateFood.css";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const UpdateFood = () => {
  const { foodId } = useParams(); // Extract foodId from the URL
  const navigate = useNavigate(); // To redirect after successful update

  const [foodDetails, setFoodDetails] = useState({
    title: "",
    price: "",
    categoryId: "",
    status: "",
    image_url: "",
    availability: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch initial food details
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(
          `${baseURL}/admin/foods?foodId=${foodId}`
        );
        const data = await response.json();
        setFoodDetails(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching food details:", err);
        setError("Failed to load food details.");
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [foodId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/admin/foods/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodDetails),
      });

      if (response.ok) {
        alert("Food updated successfully!");
        navigate("/admin/foods"); // Redirect to the foods list page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Error updating food:", err);
      alert("Failed to update food.");
    }
  };

  if (loading) {
    return <p className="loading-message">Loading food details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="update-food-container">
      <h2 className="update-food-title">Update Food</h2>
      <form onSubmit={handleSubmit} className="update-food-form">
        <div className="form-group">
          <img
            src={foodDetails.image_url}
            alt="Food"
            className="food-image"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={foodDetails.title}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={foodDetails.price}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
