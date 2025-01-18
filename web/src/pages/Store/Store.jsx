import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchCanteens, fetchCategories, fetchFoods } from "../../api/storeAPI";
import "./Store.css";

const Orders = ({setCartItemCounter}) => {
  const [canteens, setCanteens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]); // Track cart items
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCanteens, setLoadingCanteens] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages from the API

  // Load cart from local storage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Fetch canteens on mount
  useEffect(() => {
    const loadCanteens = async () => {
      try {
        setLoadingCanteens(true);
        const canteenData = await fetchCanteens();
        setCanteens(canteenData);
        if (canteenData.length > 0) {
          setSelectedCanteen(canteenData[0].canteenId);
        }
      } catch (error) {
        console.error("Failed to load canteens:", error);
      } finally {
        setLoadingCanteens(false);
      }
    };
    loadCanteens();
  }, []);

  // Fetch categories when canteen changes
  useEffect(() => {
    if (selectedCanteen) {
      const loadCategories = async () => {
        try {
          setLoadingCategories(true);
          const categoryData = await fetchCategories(selectedCanteen);
          setCategories(categoryData);
          if (categoryData.length > 0) {
            setSelectedCategory(categoryData[0].categoryId);
            setCurrentPage(1); // Reset to first page when category changes
          }
        } catch (error) {
          console.error("Failed to load categories:", error);
        } finally {
          setLoadingCategories(false);
        }
      };
      loadCategories();
    }
  }, [selectedCanteen]);

  // Fetch foods when category or page changes
  useEffect(() => {
    if (selectedCategory) {
      const loadFoods = async () => {
        try {
          setLoadingFoods(true);
          const foodData = await fetchFoods(selectedCategory, currentPage, 3); // Limit 2 items per page
          setFoods(foodData.foods);
          setTotalPages(foodData.pagination.totalPages); // Update total pages
        } catch (error) {
          console.error("Failed to load foods:", error);
        } finally {
          setLoadingFoods(false);
        }
      };
      loadFoods();
    }
  }, [selectedCategory, currentPage]);

  // Add item to cart
  const addToCart = (food, quantity) => {
    // Check if item already exists in the cart
    const existingItem = cart.find((item) => item.foodId === food.foodId);
  
    if (existingItem) {
      // If item exists, update the quantity
      const updatedCart = cart.map((item) =>
        item.foodId === food.foodId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      setCartItemCounter(updatedCart.length);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If item doesn't exist, add it with the given quantity, price, and title
      const updatedCart = [
        ...cart,
        { foodId: food.foodId, title: food.title, price: food.price, quantity },
      ];
      setCart(updatedCart);
      setCartItemCounter(updatedCart.length);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  



  // Remove item from cart
  const removeFromCart = (foodId) => {
    const updatedCart = cart.filter((item) => item.foodId !== foodId);
    setCart(updatedCart);
    setCartItemCounter(updatedCart.length);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Check if food is in cart
  const isInCart = (foodId) => {
    return cart.some((item) => item.foodId === foodId);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="orders-container">
      <div className="selector-container">
        <div className="canteen-selector">
          {loadingCanteens ? (
            <Skeleton height={40} width="100%" />
          ) : (
            <select
              id="canteen"
              value={selectedCanteen || ""}
              onChange={(e) => setSelectedCanteen(Number(e.target.value))}
            >
              {canteens.map((canteen) => (
                <option key={canteen.canteenId} value={canteen.canteenId}>
                  {canteen.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="category-scroll">
          {loadingCategories ? (
            [1, 2, 3].map((_, index) => (
              <Skeleton key={index} height={40} width={100} style={{ marginRight: "10px" }} />
            ))
          ) : (
            categories.map((category) => (
              <button
                key={category.categoryId}
                className={`category-btn ${
                  selectedCategory === category.categoryId ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.categoryId)}
              >
                {category.title}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="foods-display">
        {loadingFoods ? (
          <div className="food-items">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="food-card">
                <Skeleton height={150} width="100%" />
                <Skeleton height={20} width="60%" style={{ margin: "10px auto" }} />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="food-items">
              {foods.map((food) => (
                <div key={food.foodId} className="food-card">
                  <img src={food.image_url} alt={food.title} className="food-image" />
                  <div className="food-details">
                    <h4>{food.title}</h4>
                    <p className="food-price">LKR {food.price.toFixed(2)}</p>
                  </div>
                  <div className="food-actions">
                    {isInCart(food.foodId) ? (
                      <button
                        className="btn remove-from-cart"
                        onClick={() => removeFromCart(food.foodId)}
                      >
                        Remove
                      </button>
                    ) : (
                      <>
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          className="quantity-input"
                          id={`quantity-${food.foodId}`}
                        />
                        <button
                          className="btn add-to-cart"
                          onClick={() =>
                            addToCart(
                              food,
                              Number(
                                document.getElementById(`quantity-${food.foodId}`).value
                              )
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
