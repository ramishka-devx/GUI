const express = require('express');
const { getOrderHistory } = require('../controllers/profileController');
const profileRouter = express.Router();

profileRouter.get('/orders', getOrderHistory);


module.exports = profileRouter;
