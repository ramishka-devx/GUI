import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./DailyOrdersGraph.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const DailyOrdersGraph = ({setIsLoading}) => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days before today
    endDate: new Date().toISOString().split("T")[0], // Today's date
  });
  

  const fetchGraphData = async () => {
    setIsLoading(true);
    try {
      const { startDate, endDate } = dateRange;
      if (!startDate || !endDate) {
        toast.warning("Please select a valid date range.");
        setLoading(false);
        return;
      }

      const canteenId = localStorage.getItem("canteenId");

      const response = await fetch(
        `${baseURL}/admin/dashboard/graph/dailyorders?startDate=${startDate}&endDate=${endDate}&canteenId=${canteenId}`
      );
      const data = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const labels = graphData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  });

  const data = {
    labels, // Formatted date labels
    datasets: [
      {
        label: "Orders",
        data: graphData.map((item) => item.orders),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Revenue (LKR)",
        data: graphData.map((item) => item.revenue),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to scale properly
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          autoSkip: false, // Ensures all labels are shown
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Count / Revenue (LKR)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        beginAtZero: true,
      },
    },
  };


  return (
    <div className="graph-container">
      <h2>Daily Orders and Revenue</h2>

      <div className="date-range-form">
        <div className="filter-card">
          <label>
            From :
          </label>

            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
            />
        </div>

        <div className="filter-card">
          <label>
            TO :
          </label>

            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
            />
        </div>

        <button onClick={fetchGraphData}>Fetch Data</button>
      </div>

      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DailyOrdersGraph;
