import React, { useState, useEffect } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;


const CategorySelect = ({ canteenId, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (canteenId) {
      fetchCategories();
    }
  }, [canteenId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/categories?canteenId=${canteenId}`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    onCategoryChange(selected); // Pass the selected category ID to the parent component
  };

  return (
    <div className="category-select">
      <label htmlFor="category">Select Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleChange}
        required
      >
        <option value="">-- Select a Category --</option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
