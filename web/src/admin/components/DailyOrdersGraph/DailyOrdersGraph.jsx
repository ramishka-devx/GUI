import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import './DailyOrdersGraph.css'

const DailyOrdersGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchGraphData = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = dateRange;
      if (!startDate || !endDate) {
        alert("Please select a valid date range.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5369/admin/dashboard/graph/dailyorders?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component loads or dateRange changes
    if (dateRange.startDate && dateRange.endDate) {
      fetchGraphData();
    }
  }, [dateRange]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading graph data...</p>;
  }

  const labels = graphData.map((item) => item.date); // Dates
  const orderCounts = graphData.map((item) => item.orders); // Order counts
  const revenues = graphData.map((item) => item.revenue); // Revenues

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: orderCounts,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Revenue ($)",
        data: revenues,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count / Revenue ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "90%", margin: "0 auto", padding: "20px" }}>
      <h2>Daily Orders and Revenue</h2>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
          />
        </label>
        <button onClick={fetchGraphData}>Fetch Data</button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyOrdersGraph;
