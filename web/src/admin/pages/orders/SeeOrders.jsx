import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SeeOrder.css";
import { fetchOrdersByDate, updateOrderStatus } from "../../api/adminAPI";

const SeeOrders = () => {
  const [canteenId, setCanteenId] = useState(localStorage.getItem("canteenId"));
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD
  });
  const [search, setSearch] = useState(""); // State for search input
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await fetchOrdersByDate(selectedDate, search, canteenId);
      setOrders(fetchedOrders);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedDate, search]); // Trigger fetch when search or date changes

  const handleAction = (orderId, status) => async () => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="see-orders-container">
      <h1>Order Management</h1>
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="selectedDate">Select Date</label>
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="responsive-table">
        {isLoading ? (
          // Render skeleton rows when loading
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Order Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={250} />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Order Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>
                      {order.firstName} {order.lastName}
                    </td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td className="order-cell">
                      {order.orderItems.map((item) => (
                        <div key={item.orderItemId}>
                          {item.foodTitle}, {item.quantity} x{" "}
                          {item.price.toFixed(2)}
                        </div>
                      ))}
                    </td>
                    <td>LKR {order.total_price.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.order_status === 0
                            ? "badge-pending"
                            : "badge-completed"
                        }`}
                      >
                        {order.order_status === 0 ? "Pending" : "Completed"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`action-button ${
                          order.order_status === 0
                            ? "button-complete"
                            : "button-undo"
                        }`}
                        onClick={handleAction(
                          order.orderId,
                          order.order_status == 0 ? 1 : 0
                        )}
                      >
                        {order.order_status === 0 ? "FINISH" : "Undo"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-orders-row">
                  <td colSpan="7" className="no-orders-column">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <br />
      <hr />
    </div>
  );
};

export default SeeOrders;
