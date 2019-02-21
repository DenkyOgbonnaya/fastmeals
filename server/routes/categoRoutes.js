const categoryController = require('../controller/categController');
const express = require('express');
const categRouter = express.Router();

const{getCategories, getMealsByCat, addCategory} = categoryController;

categRouter.route('/categories')
.get(getCategories)
.post(addCategory)

categRouter.get('/:category/category', getMealsByCat);

module.exports = categRouter;
