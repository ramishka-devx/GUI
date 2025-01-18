const db = require('../config/db');

const getOrdersAdmin = async (req, res) => {
    try {
        // Extract the selected date from the query parameters
        const { selectedDate } = req.query;

        // Validate if the selectedDate is provided
        if (!selectedDate) {
            return res.status(400).json({ success: false, message: 'Please provide a valid date.' });
        }

        // Fetch orders filtered by the selected date
        const orders = await db.query(
            `
            SELECT 
                o.orderId, 
                o.userId, 
                o.date, 
                o.total_price, 
                o.order_status, 
                o.created_at, 
                o.updated_at
            FROM orders o
            WHERE DATE(o.date) = ?
            `,
            [selectedDate] // Pass the selected date as a parameter
        );

        // If no orders are found, return an empty result
        if (orders.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Fetch order items for the filtered orders
        const orderIds = orders.map((order) => order.orderId);
        const orderItems = await db.query(
            `
            SELECT 
                oi.orderItemId,
                oi.orderId,
                oi.foodId,
                oi.quantity,
                oi.price,
                oi.created_at,
                oi.updated_at
            FROM orderItems oi
            WHERE oi.orderId IN (?)
            `,
            [orderIds]
        );

        // Map order items to their respective orders
        const ordersWithItems = orders.map((order) => {
            return {
                ...order,
                orderItems: orderItems.filter((item) => item.orderId === order.orderId),
            };
        });

        res.status(200).json({ success: true, data: ordersWithItems });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
    }
};

module.exports = { getOrdersAdmin };
