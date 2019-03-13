const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
      },
      image: {
        data: Buffer,
        contentType: String
      },
      description: {
        type: String,
        trim: true
      },
      category: {
        type: String
      },
      quantity: {
        type: Number,
        required: "Quantity is required"
      },
      price: {
        type: Number,
        required: "Price is required"
      },
      updated: Date,
      created: {
        type: Date,
        default: Date.now
      },
})
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;