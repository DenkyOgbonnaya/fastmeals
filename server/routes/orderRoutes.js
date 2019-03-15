const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');

const{createOrder, getOrder, getOrders} = orderController;
orderRouter = express.Router();

orderRouter.route('/:userId/order')
.post(createOrder)
.get(getOrders)

orderRouter.route('/order/:orderId')
.get(getOrder)

module.exports = orderRouter;