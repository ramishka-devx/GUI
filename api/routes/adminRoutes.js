const express = require('express');
const { getOrdersAdmin, updateOrderStatus } = require('../admin/adminControllers');
const multer = require("multer");
const { addFood, getAllFoodsInCanteen, getSingleFood, updateFoodDetails, updateFoodStatus } = require('../admin/manageFoods');
const { getCategories } = require('../admin/manageCategories');
const {dailyOrdersGraph, getTodaySummary} = require('../admin/Dashboard');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/orders', getOrdersAdmin);
router.put('/orders/update', updateOrderStatus);

//foods
router.get("/foods/all", getAllFoodsInCanteen);
router.get("/foods", getSingleFood);
router.post("/foods/new", upload.single("image"), addFood);
router.put("/foods/update", updateFoodDetails);
router.put("/foods/updatestatus", updateFoodStatus);

//categoris
router.get("/categories", getCategories);

//dashboard
router.get("/dashboard/graph/dailyorders" , dailyOrdersGraph)
router.get("/dashboard/orders" , getTodaySummary)

module.exports = router;