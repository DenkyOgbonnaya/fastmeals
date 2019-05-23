const categoryController = require('../controller/categController');
const categRouter = require('express').Router();
const validation = require('../middleware/validation')

const{getCategories, getMealsByCat, addCategory, updateCategory, categoriesInDept } = categoryController;
const{isLoggedIn, isAdmin} = validation;

categRouter.route('/categories')
.get(getCategories)
.post(isLoggedIn, isAdmin, addCategory)

categRouter.route('/categories/:categoryId')
.put(isLoggedIn, isAdmin, updateCategory)

categRouter.get('/categories/inDept/:department', categoriesInDept )

module.exports = categRouter;
