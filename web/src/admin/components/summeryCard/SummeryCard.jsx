import React, { useEffect, useState } from "react";
import "./SummeryCard.css"; // Optional: For styling
const baseURL = process.env.REACT_APP_API_BASE_URL;

const SummaryCards = ({ setIsLoading }) => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/dashboard/orders`);
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);


  return (
    <div className="summary-container">
      <div className="summary-card">
        <h3>Total Orders</h3>
        <p>{summary.totalOrders}</p>
      </div>
      <div className="summary-card">
        <h3>Total Revenue</h3>
        <p>LKR {summary.totalRevenue.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Pending Orders</h3>
        <p>{summary.pendingOrders}</p>
      </div>
      <div className="summary-card">
        <h3>Completed Orders</h3>
        <p>{summary.completedOrders}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
