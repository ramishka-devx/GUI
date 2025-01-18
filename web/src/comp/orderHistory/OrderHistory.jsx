import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./OrderHistory.css";

const OrderHistory = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="order-history-container">
        <h1 className="order-history-title">
          <Skeleton width={200} height={30} />
        </h1>
        <div className="orders-list">
          {[1, 2, 3].map((index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={20} />
              </div>
              <div className="order-items">
                {[1, 2].map((itemIndex) => (
                  <div key={itemIndex} className="order-item">
                    <Skeleton width="80%" height={15} />
                    <Skeleton width="60%" height={15} />
                    <Skeleton width="40%" height={15} />
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <Skeleton width={100} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log("Orders:", orders);
  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Order History</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order.orderId}</h3>
                <p className="order-date">Date: {new Date(order.date).toLocaleString()}</p>
                <p className="order-status">
                  Status:{" "}
                  <span className={order.order_status === 0 ? "pending" : "completed"}>
                    {order.order_status === 0 ? "Pending" : "Completed"}
                  </span>
                </p>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <p className="item-title">{item.foodTitle}</p>
                    <p className="item-details">
                      Quantity: {item.quantity} | Price: LKR {item.foodPrice.toFixed(2)}
                    </p>
                    <p className="item-total">
                      Item Total: LKR {(item.foodPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <h3>Total: LKR {order.total_price.toFixed(2)}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
