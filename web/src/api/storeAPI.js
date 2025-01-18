import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Fetch all canteens
export const fetchCanteens = async () => {
  try {
    const response = await axios.get(`${baseURL}/store/canteens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching canteens:", error);
    throw error;
  }
};

// Fetch categories by canteenId
export const fetchCategories = async (canteenId) => {
  try {
    const response = await axios.get(`${baseURL}/store/categories?canteenId=${canteenId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch foods (optionally filtered by categoryId)
export const fetchFoods = async (categoryId, page = 1, limit = 2) => {
  try {
    const response = await axios.get(`${baseURL}/store/foods?categoryId=${categoryId}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};