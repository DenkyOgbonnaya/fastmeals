const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        toLowerCase: true
    },
    department: String,
})
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;