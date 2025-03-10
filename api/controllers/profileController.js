const jwt = require("jsonwebtoken");
const db = require("../config/db");
const env = require("dotenv").config();

const getOrderHistory = async (req, res) => {
  // Extract the JWT token from the Authorization header
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    // Decode the JWT to get the userId
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // SQL query to fetch order history
    const orderHistoryQuery = `
      SELECT 
        o.orderId,
        o.total_price,
        o.order_status,
        o.date,
        oi.foodId,
        f.title AS foodTitle,
        oi.quantity,
        oi.price AS foodPrice
      FROM 
        orders o
      JOIN 
        orderItems oi ON o.orderId = oi.orderId
      JOIN 
        foods f ON oi.foodId = f.foodId
      WHERE 
        o.userId = ?
      ORDER BY 
        o.orderId DESC;
    `;

    const rows = await db.query(orderHistoryQuery, [userId]); // Remove destructuring

    // Convert RowDataPacket into an array (if necessary)
    const results = Array.isArray(rows)
      ? rows
      : Object.values(JSON.parse(JSON.stringify(rows)));

    // Group results by orderId for better structuring
    const groupedOrders = results.reduce((acc, row) => {
      const {
        orderId,
        total_price,
        order_status,
        date,
        foodId,
        foodTitle,
        quantity,
        foodPrice,
      } = row;

      if (!acc[orderId]) {
        acc[orderId] = {
          orderId,
          total_price,
          order_status,
          date,
          items: [],
        };
      }

      acc[orderId].items.push({ foodId, foodTitle, quantity, foodPrice });
      return acc;
    }, {});

    const orders = Object.values(groupedOrders).sort(
      (a, b) => b.orderId - a.orderId
    );

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Failed to fetch order history:", error);
    res.status(500).json({ message: "Failed to fetch order history", error });
  }
};

const profile = async (req, res) => {
  try {
    const token = req.header("token"); 

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verified.userId;

    const query =
      "SELECT userId, firstName, lastName, email, phone, regNo, batch, dp,status, roll, canteenId, created_at, updated_at FROM users WHERE userId = ?";

    db.query(query, [userId], (err, result) => {
      try {
        if (err) {
          throw new Error("Database query error");
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(result[0]); // Return user profile
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getOrderHistory, profile};
