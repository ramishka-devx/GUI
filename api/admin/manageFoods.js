const db = require("../config/db");
const cloudinary = require("../config/cloudinary");


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

  console.log(categoryId) 
  if (!req.file || !categoryId || !title || !price ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "food_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const imageUrl = result.secure_url;

    // Insert food into the database
    const sql = "INSERT INTO foods (categoryId, title, price, image_url) VALUES (?, ?, ?, ?)";
    const values = [categoryId, title, price, imageUrl];

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: "Food added successfully", foodId: result.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add food" });
  }
};



module.exports = { addFood , getAllFoodsInCanteen};