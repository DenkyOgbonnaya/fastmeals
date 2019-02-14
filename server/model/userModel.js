const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    street: {
        type: String,
    },
    town: {
        type: String,
    },
    state: {
        type: String,
    },
})

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
    isBanned: {
        type: Number,
        default: 0,
    },
    contact: {
        type: contactSchema,
        default: {}
    },
    orders: [{
        type: Schema.Types.ObjectId, ref: 'Order'
    }]
}, 
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;