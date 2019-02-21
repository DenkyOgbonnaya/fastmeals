const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController');

const{addToCart, getCart, removeFromCart, genCartId} =cartController;
cartRouter.route('/cart')
    .post(addToCart)
    .get(genCartId)
cartRouter.route('/cart/:cartId')
    .get(getCart)
cartRouter.route('/cart/:cartId/:mealId')
    .delete(removeFromCart)

module.exports = cartRouter;