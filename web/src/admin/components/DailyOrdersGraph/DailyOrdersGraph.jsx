import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; 
import './DailyOrdersGraph.css' // Ensures Chart.js works with react-chartjs-2

const DailyOrdersGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch("http://localhost:5369/admin/dashboard/graph/dailyorders");
        const data = await response.json();
        setGraphData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) {
    return <p>Loading graph data...</p>;
  }

  // Extract data for the graph
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
        tension: 0.4, // For a smoother line
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
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyOrdersGraph;
