const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', placeOrder);

module.exports = router;