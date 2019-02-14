const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    order: {
        type: Array,
        default: []
     },
    totalPrice: Number,
    isDelivered: {
        type: Boolean,
        default: false,
    },
    orderedOn: {
        type: Date,
        default: Date.now
    }   
}
)
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;