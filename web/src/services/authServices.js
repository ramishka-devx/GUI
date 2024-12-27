import axios from 'axios';

// Set the base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:5369',
});

// Register API call
export const registerUser = async (data) => {
  return await API.post('/auth/register', data);
};

// Login API call
export const loginUser = async (data) => {
  return await API.post('/auth/login', data);
};
