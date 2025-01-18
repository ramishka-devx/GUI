const express = require('express');
const { getOrdersAdmin } = require('../admin/adminControllers');

const router = express.Router();

router.post('/orders', getOrdersAdmin);

module.exports = router;