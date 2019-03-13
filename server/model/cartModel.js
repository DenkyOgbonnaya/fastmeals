const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    mealId: String,
    name: String,
    price: Number,
    subTotal: Number,
    quantity: Number,
    cartFor: String,
    image: String,
    status: {type: String,
        default: 'Not processed',
        enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']}
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Cart, cartSchema};