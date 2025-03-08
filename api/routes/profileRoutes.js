const express = require('express');
const { getOrderHistory, profile } = require('../controllers/profileController');
const profileRouter = express.Router();

profileRouter.get('/', profile);
profileRouter.get('/orders', getOrderHistory);


module.exports = profileRouter;
