const jwt = require("jsonwebtoken");
const db = require("../config/db");

const placeOrder = async (req, res) => {
  const { items,canteenId } = req.body;

  // Get the userId from the JWT token
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData.userId;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    // Calculate total price
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Start transaction
    await db.beginTransaction();

    // Insert into 'orders' table
    const orderQuery = `
      INSERT INTO orders (userId, total_price,canteenId)
      VALUES (?, ?,?)
    `;
    const orderResult = await db.query(orderQuery, [userId, totalPrice, canteenId]);
    const orderId = orderResult.insertId;

    // Insert each item into 'orderItems' table
    const orderItemsQuery = `
      INSERT INTO orderItems (orderId, foodId, quantity, price)
      VALUES ?
    `;
    const orderItemsData = items.map((item) => [
      orderId,
      item.foodId,
      item.quantity,
      item.price,
    ]);

    await db.query(orderItemsQuery, [orderItemsData]);

    // Commit the transaction
    await db.commit();

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (error) {
    // Rollback transaction in case of an error
    console.error("Failed to place order:", error);
    await db.rollback();
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = { placeOrder };
