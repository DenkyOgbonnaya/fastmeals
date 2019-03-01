const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');

const{createOrder, getOrder} = orderController;
orderRouter = express.Router();

orderRouter.route('/order/:userId')
.post(createOrder)
.get(getOrder)

module.exports = orderRouter;