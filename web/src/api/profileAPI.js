import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Fetch order history
export const fetchOrderHistory = async (token, page = 1, limit = 5) => {
    try {
      const response = await axios.get(
        `${baseURL}/profile/orders`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order history:", error);
      throw error;
    }
  };
  