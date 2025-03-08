import React, { useState, useEffect } from "react";
import { fetchOrderHistory } from "../../api/profileAPI";
import { useNavigate } from "react-router-dom";
import OrderHistory from "../../comp/orderHistory/OrderHistory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import TitleCard from "../../comp/title/TitleCard";
import ProfileCard from "../../comp/profileCard/ProfileCard";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your order history.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const ordersData = await fetchOrderHistory(token);
        console.log("Fetched Orders:", ordersData);
        setOrders(ordersData || []);
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

  return (
    <>
      <ProfileCard />
      <div className="profile-page">
        <TitleCard title={"History"} />
        <OrderHistory orders={orders.orders} loading={false} />
      </div>
    </>
  );
};

export default ProfilePage;
