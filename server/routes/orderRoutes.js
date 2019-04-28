const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');
const paystackController = require('../controller/paystack')
const validation = require('../middleware/validation');

const{createOrder, getOrder, getOrders, deleteOrder} = orderController;
const{startPayment} = paystackController;
const{isLoggedIn} = validation;
orderRouter = express.Router();

orderRouter.route('/:userId/order')
.post(isLoggedIn, createOrder, startPayment)
.get(getOrders)

orderRouter.route('/order/:orderId')
.get(getOrder)
.delete(isLoggedIn, deleteOrder)

module.exports = orderRouter;