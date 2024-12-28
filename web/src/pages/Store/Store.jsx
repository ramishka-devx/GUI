import React, { useState, useEffect } from 'react';
import { fetchCanteens, fetchCategories, fetchFoods } from '../../api/storeAPI';

const Store = () => {
  const [canteens, setCanteens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadCanteens = async () => {
      try {
        const data = await fetchCanteens();
        setCanteens(data);
      } catch (error) {
        console.error('Error loading canteens:', error);
      }
    };
    loadCanteens();
  }, []);

  useEffect(() => {
    if (selectedCanteen) {
      const loadCategories = async () => {
        try {
          const data = await fetchCategories(selectedCanteen);
          setCategories(data);
        } catch (error) {
          console.error('Error loading categories:', error);
        }
      };
      loadCategories();
    }
  }, [selectedCanteen]);

  useEffect(() => {
    if (selectedCategory) {
      const loadFoods = async () => {
        try {
          const data = await fetchFoods(selectedCategory, currentPage);
          setFoods(data.foods);
          setTotalPages(data.pagination.totalPages);
        } catch (error) {
          console.error('Error loading foods:', error);
        }
      };
      loadFoods();
    }
  }, [selectedCategory, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Canteen</h1>
      <select
        className="w-full p-2 mb-4 border rounded text-black bg-white"
        onChange={(e) => setSelectedCanteen(e.target.value)}
      >
        <option value="">Select a canteen</option>
        {canteens.map(canteen => (
          <option key={canteen.canteenId} value={canteen.canteenId}>
            {canteen.title}
          </option>
        ))}
      </select>

      {selectedCanteen && (
        <>
          <h2 className="text-xl font-semibold mb-4">Select Category</h2>
          <select
            className="w-full p-2 mb-4 border rounded text-black bg-white"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.title}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedCategory && (
        <>
          <h3 className="text-lg font-semibold mb-4">Foods</h3>
          <ul className="list-disc pl-5">
            {foods.map(food => (
              <li key={food.foodId} className="mb-2">
                {food.title} - ${food.price}
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-1 border rounded bg-gray-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
            <button
              className="px-4 py-2 mx-1 border rounded bg-gray-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Store;