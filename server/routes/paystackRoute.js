const paystackRouter = require('express').Router();
const orderController = require('../controller/orderController');
const paystackController = require('../controller/paystack');

const{startPayment, verifyPayment} = paystackController;
const{createOrder} = orderController;

paystackRouter.post('/paystack/pay', createOrder, startPayment)
paystackRouter.get('/paystack/redirect', verifyPayment);

module.exports = paystackRouter;