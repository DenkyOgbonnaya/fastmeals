const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    mealId: String,
    name: String,
    price: Number,
    subTotal: Number,
    quantity: Number,
    cartFor: String
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;