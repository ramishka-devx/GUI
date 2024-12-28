const express = require('express');
const { getCanteens, getCategoriesByCanteen, getFoodsByCategory } = require('../controllers/storeController');
const router = express.Router();

router.get('/canteens', getCanteens);
router.get('/categories', getCategoriesByCanteen);
router.get('/foods', getFoodsByCategory);

module.exports = router;