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
  const [loadingCanteens, setLoadingCanteens] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);

  useEffect(() => {
    const loadCanteens = async () => {
      try {
        setLoadingCanteens(true);
        const data = await fetchCanteens();
        setCanteens(data);
        if (data.length > 0) {
          setSelectedCanteen(data[0].canteenId); // Automatically select the first canteen
        }
      } catch (error) {
        console.error('Error loading canteens:', error);
      } finally {
        setLoadingCanteens(false);
      }
    };
    loadCanteens();
  }, []);

  useEffect(() => {
    if (selectedCanteen) {
      const loadCategories = async () => {
        try {
          setLoadingCategories(true);
          const data = await fetchCategories(selectedCanteen);
          setCategories(data);
          if (data.length > 0) {
            setSelectedCategory(data[0].categoryId); // Automatically select the first category
          }
        } catch (error) {
          console.error('Error loading categories:', error);
        } finally {
          setLoadingCategories(false);
        }
      };
      loadCategories();
    }
  }, [selectedCanteen]);

  useEffect(() => {
    if (selectedCategory) {
      const loadFoods = async () => {
        try {
          setLoadingFoods(true);
          const data = await fetchFoods(selectedCategory, currentPage);
          setFoods(data.foods);
          setTotalPages(data.pagination.totalPages);
        } catch (error) {
          console.error('Error loading foods:', error);
        } finally {
          setLoadingFoods(false);
        }
      };
      loadFoods();
    }
  }, [selectedCategory, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Canteen Menu</h1>

      {/* Canteen Selection */}
      <h2 className="text-xl font-semibold mb-4">Select a Canteen</h2>
      {loadingCanteens ? (
        <div className="flex justify-center mb-6">
          <div className="loader animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {canteens.map(canteen => (
            <button
              key={canteen.canteenId}
              onClick={() => setSelectedCanteen(canteen.canteenId)}
              className={`p-4 border rounded text-center transition ${
                selectedCanteen === canteen.canteenId
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {canteen.title}
            </button>
          ))}
        </div>
      )}

      {/* Category Selection */}
      {categories.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
          {loadingCategories ? (
            <div className="flex justify-center mb-6">
              <div className="loader animate-spin rounded-full h-10 w-10 border-t-2 border-green-500"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map(category => (
                <button
                  key={category.categoryId}
                  onClick={() => setSelectedCategory(category.categoryId)}
                  className={`px-6 py-3 border rounded text-center transition ${
                    selectedCategory === category.categoryId
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Food Display */}
      {foods.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Available Foods</h3>
          {loadingFoods ? (
            <div className="flex justify-center mb-6">
              <div className="loader animate-spin rounded-full h-10 w-10 border-t-2 border-gray-500"></div>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {foods.map(food => (
                <li
                  key={food.foodId}
                  className="p-4 border rounded bg-gray-100 shadow hover:shadow-lg"
                >
                  <h4 className="font-semibold">{food.title}</h4>
                  <p className="text-gray-700">Price: ${food.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 mx-1 border rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 mx-1 border rounded bg-gray-200 hover:bg-gray-300"
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
