const express = require('express');
const { getOrdersAdmin, updateOrderStatus } = require('../admin/adminControllers');
const multer = require("multer");
const { addFood, getAllFoodsInCanteen } = require('../admin/manageFoods');
const { getCategories } = require('../admin/manageCategories');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/orders', getOrdersAdmin);
router.put('/orders/update', updateOrderStatus);

//foods
router.get("/foods/", getAllFoodsInCanteen);
router.post("/foods/new", upload.single("image"), addFood);

//categoris
router.get("/categories", getCategories);

module.exports = router;