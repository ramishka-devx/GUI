import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Set the base URL for the API
const API = axios.create({
  baseURL: baseURL,
});

// Register API call
export const registerUser = async (data) => {
  return await API.post('/auth/register', data);
};

// Login API call
export const loginUser = async (data) => {
  return await API.post('/auth/login', data);
};
