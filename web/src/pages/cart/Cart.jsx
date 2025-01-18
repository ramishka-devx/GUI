import React, { useState, useEffect } from "react";
import "./Cart.css";
import axios from "axios"; // For making API calls
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate();
  // Load cart from local storage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update quantity
  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    const updatedCart = cart.map((item) =>
      item.foodId === foodId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (foodId) => {
    const updatedCart = cart.filter((item) => item.foodId !== foodId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle placing the order
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty. Add items to place an order.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setMessage("");

      const token = localStorage.getItem("token"); // Replace with actual token retrieval logic
      if (!token) {
        setMessage("Please log in to place an order.");
        setIsPlacingOrder(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5369/orders/create", // Replace with your API endpoint
        { items: cart },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      navigate("/profile"); 
      setCart([]); 
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Failed to place order:", error);
      setMessage("Failed to place the order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.foodId} className="cart-item">
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Price: LKR {item.price.toFixed(2)}</p>
                </div>
                <div className="item-actions">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.foodId, Number(e.target.value))
                    }
                    className="quantity-input"
                  />
                  <p>Total: LKR {(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn remove-btn"
                    onClick={() => removeFromCart(item.foodId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: LKR {calculateTotal()}</h2>
          </div>
          <button
            className="btn place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;
