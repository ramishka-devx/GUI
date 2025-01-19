import React, { useEffect, useState } from "react";
import './SummeryCard.css'; // Optional: For styling

const SummaryCards = () => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:5369/admin/dashboard/orders");
        const data = await response.json();
        setSummary(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <p>Loading summary data...</p>;
  }

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
