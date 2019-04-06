const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');
const validation = require('../middleware/validation');

const{createOrder, getOrder, getOrders, deleteOrder} = orderController;
const{isLoggedIn} = validation;
orderRouter = express.Router();

orderRouter.route('/:userId/order')
.post(isLoggedIn, createOrder)
.get(getOrders)

orderRouter.route('/order/:orderId')
.get(getOrder)
.delete(isLoggedIn, deleteOrder)

module.exports = orderRouter;