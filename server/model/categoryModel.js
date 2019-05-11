const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    title: String,
    department: String,
    meals: [{
        type: Schema.Types.ObjectId, ref: 'Meal'
    }]
})
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;