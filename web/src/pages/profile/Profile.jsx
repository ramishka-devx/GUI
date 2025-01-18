import React, { useState, useEffect } from "react";
import { fetchOrderHistory } from "../../api/profileAPI";
import OrderHistory from "../../comp/orderHistory/OrderHistory";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your order history.");
          setLoading(false);
          return;
        }

        const ordersData = await fetchOrderHistory(token);
        console.log("Fetched Orders:", ordersData); // Debugging
        setOrders(ordersData || []); // Ensure ordersData is an array
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError("Failed to load order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, []);

  if (loading) {
    return <OrderHistory loading={true} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <OrderHistory orders={orders.orders } loading={false} />;
};

export default ProfilePage;
