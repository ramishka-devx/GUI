const express = require("express");
const db = require("../config/db");

const getCategories = async (req, res) => {
    const { canteenId } = req.query;
    const sql = "SELECT * FROM categories WHERE canteenId = ?";
    
    db.query(sql, [canteenId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch categories" });
      }
      res.status(200).json(results);
    });
}

module.exports = { getCategories };

