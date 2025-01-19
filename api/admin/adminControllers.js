const db = require('../config/db');

const getOrdersAdmin = async (req, res) => {
    try {
        const { selectedDate, search, canteenId } = req.query;

        // Validate if the selectedDate is provided
        if (!selectedDate || !canteenId) {
            return res.status(400).json({ success: false, message: 'Please provide a valid date.' });
        }

        // Build query dynamically based on search parameter
        let searchQuery = '';
        const queryParams = [selectedDate];
        queryParams.push(canteenId);

        if (search) {
            searchQuery = `
            AND (
                u.firstName LIKE ? OR 
                u.lastName LIKE ? OR 
                o.orderId LIKE ?
            )
            `;
            const searchParam = `%${search}%`;
            queryParams.push(searchParam, searchParam, searchParam);
        }

        // Fetch orders filtered by the selected date and search criteria
        const orders = await db.query(
            `
            SELECT 
                o.orderId, 
                o.userId, 
                u.firstName, 
                u.lastName, 
                o.date, 
                o.total_price, 
                o.order_status, 
                o.created_at, 
                o.updated_at
            FROM orders o
            JOIN users u ON o.userId = u.userId
            WHERE DATE(o.date) = ? AND o.canteenId = ?
            ${searchQuery}
            `,
            queryParams
        );

        if (orders.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Fetch order items for the filtered orders along with food titles
        const orderIds = orders.map((order) => order.orderId);
        const orderItems = await db.query(
            `
            SELECT 
                oi.orderItemId,
                oi.orderId,
                oi.foodId,
                f.title AS foodTitle,
                oi.quantity,
                oi.price,
                oi.created_at,
                oi.updated_at
            FROM orderItems oi
            JOIN foods f ON oi.foodId = f.foodId
            WHERE oi.orderId IN (?)
            `,
            [orderIds]
        );

        // Map order items to their respective orders
        const ordersWithItems = orders.map((order) => ({
            ...order,
            orderItems: orderItems.filter((item) => item.orderId === order.orderId),
        }));

        res.status(200).json({ success: true, data: ordersWithItems });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
    }
};

//update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate input
        if (!orderId || typeof status === 'undefined') {
            return res.status(400).json({ success: false, message: 'Order ID and status are required.' });
        }

        // Validate status value
        const validStatuses = [0, 1, 5]; // Allowed statuses
        if (!validStatuses.includes(Number(status))) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        // Update order status in the database
        const result = await db.query(
            `UPDATE orders SET order_status = ?, updated_at = NOW() WHERE orderId = ?`,
            [status, orderId]
        );

        // Check if any row was affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        res.status(200).json({ success: true, message: 'Order status updated successfully.' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Failed to update order status.', error });
    }
};

module.exports = { getOrdersAdmin , updateOrderStatus};
