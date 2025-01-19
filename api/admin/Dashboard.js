const db = require("../config/db"); // Replace with the path to your database connection file

const dailyOrdersGraph = async (req, res) => {
  try {
    // Query to fetch daily order count and revenue for the past 7 days
    const query = `
      SELECT 
        DATE(created_at) AS date,
        COUNT(orderId ) AS total_orders,
        SUM(total_price) AS total_revenue
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC;
    `;

    // Execute the query
    const results = await db.query(query);

    // Format the response
    const graphData = results.map(row => ({
      date: row.date,
      orders: row.total_orders,
      revenue: row.total_revenue,
    }));

    res.json(graphData); // Send data to the frontend
  } catch (error) {
    console.error("Error fetching daily orders graph data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = dailyOrdersGraph;
