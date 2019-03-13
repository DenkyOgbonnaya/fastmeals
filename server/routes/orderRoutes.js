const express = require('express');
const cartRouter = express.Router();
const orderController = require('../controller/orderController');

const{createOrder, getOrder} = orderController;
orderRouter = express.Router();

orderRouter.route('/order/:userId')
.post(createOrder)
orderRouter.route('/order/:orderId')
.get(getOrder)

module.exports = orderRouter;