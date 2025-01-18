import React, { useState } from "react";
import "./SeeOrder.css";

const SeeOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5369/admin/orders?selectedDate=${selectedDate}`,
        { method: "POST" }
      );
      const result = await response.json();

      if (result.success) {
        setOrders(result.data);
      } else {
        alert("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("An error occurred while fetching orders.");
    }
  };

  return (
    
    <div className="see-orders-container">
      <h1>Order Management</h1>
      <div className="date-picker">
        <label htmlFor="selectedDate">Select Date: </label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={fetchOrders}>Fetch Orders</button>
      </div>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.userId}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>${order.total_price.toFixed(2)}</td>
                  <td>{order.order_status === 0 ? "Pending" : "Completed"}</td>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item.orderItemId}>
                        Food ID: {item.foodId}, Qty: {item.quantity}, Price: $
                        {item.price.toFixed(2)}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No orders found for the selected date.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeeOrders;
