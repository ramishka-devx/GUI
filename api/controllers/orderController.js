const db = require('../config/db');

const createOrder = async (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data' });
    }

    try {
        // Start a transaction
        db.beginTransaction((err) => {
            if (err) throw err;

            // Insert order
            const orderQuery = 'INSERT INTO orders (userId, total_price) VALUES (?, ?)';
            db.query(orderQuery, [userId, 0], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }

                const orderId = result.insertId;
                let totalPrice = 0;

                // Insert order items
                const orderItemsQuery = 'INSERT INTO orderItems (orderId, foodId, quantity, price) VALUES ?';
                const orderItemsData = items.map(item => {
                    totalPrice += item.price * item.quantity;
                    return [orderId, item.foodId, item.quantity, item.price];
                });

                db.query(orderItemsQuery, [orderItemsData], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            throw err;
                        });
                    }

                    // Update total price
                    const updateOrderQuery = 'UPDATE orders SET total_price = ? WHERE orderId = ?';
                    db.query(updateOrderQuery, [totalPrice, orderId], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                throw err;
                            });
                        }

                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    throw err;
                                });
                            }
                            res.status(201).json({ message: 'Order created successfully', orderId });
                        });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder };