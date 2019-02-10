const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true
    },
})
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;