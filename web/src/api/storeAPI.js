import axios from "axios";

// Fetch all canteens
export const fetchCanteens = async () => {
  try {
    const response = await axios.get(`http://localhost:5369/store/canteens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching canteens:", error);
    throw error;
  }
};

// Fetch categories by canteenId
export const fetchCategories = async (canteenId) => {
  try {
    const response = await axios.get(`http://localhost:5369/store/categories?canteenId=${canteenId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch foods (optionally filtered by categoryId)
export const fetchFoods = async (categoryId, page = 1, limit = 2) => {
  try {
    const response = await axios.get(`http://localhost:5369/store/foods?categoryId=${categoryId}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};