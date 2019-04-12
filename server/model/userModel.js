const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
    oauthId: {
        type: String,
    }
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;