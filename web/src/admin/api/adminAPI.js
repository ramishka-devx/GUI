
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;


export const fetchOrdersByDate = async (selectedDate, search, canteenId) => {
    if (!selectedDate) {
      throw new Error("Please select a date.");
    }
  
    try {
      const response = await fetch(
        `${baseURL}/admin/orders?selectedDate=${selectedDate}&search=${search}&canteenId=${canteenId}`,
        { method: "POST" }
      );
      const result = await response.json();
  
      if (result.success) {
        return result.data;
      } else {
        throw new Error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.put(`${baseURL}/admin/orders/update`, {
            orderId,
            status,
        });
        console.log(orderId, status);
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error.response?.data || { message: 'Failed to update order status.' };
    }
};
  