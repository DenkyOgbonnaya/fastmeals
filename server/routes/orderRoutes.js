const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');
const paystackController = require('../controller/paystack')
const validation = require('../middleware/validation');

const{createOrder,
     getOrder, getOrders, 
     deleteOrder, getOrdersInStatus, 
     updateOrderStatus} = orderController;

const{startPayment} = paystackController;
const{isLoggedIn, isAdmin} = validation;
orderRouter = express.Router();

orderRouter.route('/:userId/order')
.post(isLoggedIn, createOrder, startPayment)
.get(getOrders)

orderRouter.route('/order/:orderId')
.get(getOrder)
.delete(isLoggedIn, deleteOrder)
.put(isLoggedIn, isAdmin, updateOrderStatus)

orderRouter.route('/order/:status/status')
.get(getOrdersInStatus)

module.exports = orderRouter;