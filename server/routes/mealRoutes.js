const express = require('express');
const mealController = require('../controller/mealController');
const validation = require('../middleware/validation');
const multer = require('multer');
const {multerUploads} = require('../controller/imageUploder')

const mealRouter = express.Router();
const{
    addMeal,
    updateMeal,
    deleteMeal,
    getMeal,
    getMeals,
    searchMeal,
    mealsInCategory
} = mealController;
const{validateMealInput,
    validateMealId,
    isLoggedIn,
    isAdmin
} = validation;

mealRouter.post('/meals', multerUploads, isLoggedIn, isAdmin, addMeal)
mealRouter.get('/meals', getMeals)

mealRouter.route('/meals/:mealId')
    .put(multerUploads, isLoggedIn, isAdmin, validateMealInput, validateMealId, updateMeal)
    .delete(isLoggedIn, isAdmin, validateMealId, deleteMeal)
    .get(validateMealId, getMeal)
mealRouter.get('/meal', searchMeal);
mealRouter.get('/meals/inCategory/:category', mealsInCategory)


module.exports = mealRouter;