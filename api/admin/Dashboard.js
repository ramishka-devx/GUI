const db = require("../config/db"); // Replace with the path to your database connection file

const dailyOrdersGraph = async (req, res) => {
  try {
    // Get date range from query parameters
    const { startDate, endDate, canteenId } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required." });
    }

    // Query to fetch daily order count and revenue within the date range
    const query = `
      SELECT 
        DATE(date) AS date,
        COUNT(date) AS total_orders,
        SUM(total_price) AS total_revenue
      FROM orders
      WHERE date BETWEEN ? AND ? AND canteenId = ?
      GROUP BY DATE(date)
      ORDER BY DATE(date) ASC;
    `;

    // Execute the query with the provided date range
    const results = await db.query(query, [startDate, endDate, canteenId]);

    console.log(results);
    // Format the response
    const graphData = results.map((row) => ({
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

const getTodaySummary = async (req, res) => {
  try {
    const canteenId = req.query.canteenId;
    const query = `
      SELECT 
        COUNT(orderId) AS total_orders,
        SUM(total_price) AS total_revenue,
        SUM(CASE WHEN order_status = 'pending' THEN 1 ELSE 0 END) AS pending_orders,
        SUM(CASE WHEN order_status = 'completed' THEN 1 ELSE 0 END) AS completed_orders
      FROM orders
      WHERE DATE(date) = CURDATE() AND canteenId = ?;
    `;

    // Execute the query
    const [results] = await db.query(query, [canteenId]);
    console.log(results)

    // Response format
    const summary = {
      totalOrders: results?.total_orders || 0,
      totalRevenue: results?.total_revenue || 0,
      pendingOrders: results?.pending_orders || 0,
      completedOrders: results?.completed_orders || 0,
    };

    res.json(summary);
  } catch (error) {
    console.error("Error fetching today's summary:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getTodaySummary;


module.exports = {dailyOrdersGraph, getTodaySummary};
