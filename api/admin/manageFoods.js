const db = require("../config/db");
const cloudinary = require("../config/cloudinary");
const createHttpError = require("http-errors");

const getAllFoodsInCanteen = (req, res) => {
  const { canteenId } = req.query; // Get canteenId from request params

  if (!canteenId) {
    return res.status(400).json({ message: "canteenId is required" });
  }

  // SQL query to fetch all foods for the specified canteenId
  const sql = `
SELECT 
    f.foodId, 
    f.categoryId, 
    f.title AS foodTitle, 
    f.price, 
    f.status, 
    f.image_url, 
    f.availability, 
    f.created_at AS foodCreatedAt, 
    f.updated_at AS foodUpdatedAt,
    c.title AS categoryTitle
FROM 
    foods f
JOIN 
    categories c
ON 
    f.categoryId = c.categoryId
WHERE 
    c.canteenId = ?
  `;

  db.query(sql, [canteenId], (err, results) => {
    if (err) {
      console.error("Error fetching foods:", err);
      return res.status(500).json({ message: "Failed to fetch foods" });
    }

    res.status(200).json(results); // Send the list of foods as the response
  });
};

const addFood = async (req, res) => {
  const { categoryId, title, price } = req.body;

  console.log(categoryId);
  if (!req.file || !categoryId || !title || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "food_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    const imageUrl = result.secure_url;

    // Insert food into the database
    const sql =
      "INSERT INTO foods (categoryId, title, price, image_url) VALUES (?, ?, ?, ?)";
    const values = [categoryId, title, price, imageUrl];

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Food added successfully", foodId: result.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add food" });
  }
};

const getSingleFood = async (req, res) => {
  try {
    const { foodId } = req.query; // Extract the foodId from query parameters

    console.log(foodId)
    // Validate the foodId
    if (!foodId) {
      return res.status(400).json({ error: "foodId is required." });
    }

    // SQL query to fetch food details
    const query = "SELECT * FROM foods WHERE foodId = ?";
    db.query(query, foodId, (err, results) => {
      if (err) return next(createHttpError.InternalServerError());
      if (results.length === 0) {
        return res.status(404).json({ error: "Food item not found." });
      }
      res.json(results[0]); // Send the food details as JSON
    });
  } catch (error) {
    console.error("Error fetching food details:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateFoodDetails = async (req, res) => {
  try {
    const { foodId, title, price } = req.body;

    console.log(foodId, title, price);
    // Validate required fields
    if (!foodId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // SQL query to update food details
    const query = `
      UPDATE foods
      SET 
        title = ?, 
        price = ?, 
        updated_at = NOW()
      WHERE foodId = ?
    `;

    // Execute the query
    const result = await db.query(query, [title, price, foodId]);

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Food item not found or no changes made." });
    }

    res.json({ message: "Food details updated successfully." });
  } catch (error) {
    console.error("Error updating food details:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateFoodStatus = async (req, res) => {
  try {
    const { foodId, status } = req.body;

    // Validate required fields
    if (!foodId || typeof status === "undefined") {
      return res.status(400).json({ error: "foodId and status are required." });
    }

    // SQL query to update food status
    const query = `
      UPDATE foods
      SET status = ?
      WHERE foodId = ?
    `;

    // Execute the query
    const result = await db.query(query, [status, foodId]);

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Food item not found." });
    }

    res.json({ message: "Food status updated successfully." });
  } catch (error) {
    console.error("Error updating food status:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  addFood,
  getAllFoodsInCanteen,
  getSingleFood,
  updateFoodDetails,
  updateFoodStatus
};
