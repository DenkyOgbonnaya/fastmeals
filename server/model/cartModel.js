const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    mealId: String,
    name: String,
    price: Number,
    quantity: Number,
    cartFor: String,
    image: String,
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Cart, cartSchema};