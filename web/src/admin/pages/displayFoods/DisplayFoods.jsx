import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DisplayFoods.css";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GrPowerCycle } from "react-icons/gr";
import { updatefoodStatus } from "../../api/adminAPI";
import LoadingBanner from "../../../comp/LoadingBanner/LoadingBanner";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const DisplayFoods = () => {
  const [canteenId] = useState(localStorage.getItem("canteenId"));
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [error, setError] = useState("");

  
  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/foods/all?canteenId=${canteenId}`
      );
      setFoods(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch foods");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    setLoadingBanner(true)
    try {
      await updatefoodStatus(orderId, status);
      fetchFoods();
    } catch (error) {
      alert(error.message);
    }finally{
      setLoadingBanner(false)
    }
  };

  if (loading) {
    return (
      <div className="foods-table-container">
        <h2>Loading Foods...</h2>
        <div className="skeleton-table">
          <table>
            <thead>
              <tr>
                <th>Food ID</th>
                <th>Category</th>
                <th>Food Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>Availability</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(7)].map((_, cellIndex) => (
                    <td key={cellIndex}>
                      <Skeleton height={30} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="foods-table-container">

    {loadingBanner && <LoadingBanner />}
 

      <h2>Foods in Canteen {canteenId}</h2>
      <div className="add-food-button-container">
        <button className="add-food-button">
          <Link to="/admin/foods/add">Add New</Link>
        </button>
      </div>
      <table className="foods-table">
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Category</th>
            <th>Food Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Availability</th>
            <th>Image</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.foodId}>
              <td>{food.foodId}</td>
              <td>{food.categoryTitle}</td>
              <td>{food.foodTitle}</td>
              <td>LKR {food.price.toFixed(2)}</td>
              <td>{food.status === 1 ? "Active" : "Inactive"}</td>
              <td>{food.availability === 1 ? "Available" : "Unavailable"}</td>
              <td>
                <img
                  src={food.image_url}
                  alt={food.foodTitle}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td className="action-cell-container">
                <div className="action-cell">
                  <Link to={`/admin/foods/edit/${food.foodId}`}>
                    {" "}
                    <button>
                      <MdEdit color="Green" size={25} />
                    </button>{" "}
                  </Link>
                  <button>
                    {food.status === 1 ? (
                      <MdOutlineDeleteOutline
                        onClick={() => handleUpdateStatus(food.foodId, 0)} // Wrap in arrow function
                        color="red"
                        size={25}
                      />
                    ) : (
                      <GrPowerCycle
                        onClick={() => handleUpdateStatus(food.foodId, 1)} // Wrap in arrow function
                        color="blue"
                        size={25}
                      />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayFoods;
