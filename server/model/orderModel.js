const mongoose = require('mongoose');
const CartSchema = require('./cartModel').cartSchema;
const Schema = mongoose.Schema;

const orderSchema = Schema({
    meals: [CartSchema],
    customerName: {
      type: String,
      trim: true,
      required: 'Name is required'
    },
    customerEmail: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required'
    },
    customerPhone: {
        type: String,
        trim: true,
        required: 'Phone is required'
      },
    deliveryAddress: {
      street: {type: String, required: 'Street is required'},
      city: {type: String, required: 'City is required'},
      state: {type: String},
    },
    payment_id: {},
    updated: Date,
    status: {type: String,
      default: 'Cancelled_ Payment not made',
      enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled_ Payment not made']},
    created: {
      type: Date,
      default: Date.now
    },
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
}
)
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;