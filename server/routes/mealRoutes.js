const express = require('express');
const mealController = require('../controller/mealController');
const validation = require('../middleware/validation');

const mealRouter = express.Router();
const{
    addMeal,
    updateMeal,
    deleteMeal,
    getMeal,
    getMeals,
    getMealsByCat
} = mealController;
const{validateMealInput,
    validateMealId,
    isLoggedIn,
    isAdmin
} = validation;

mealRouter.route('/meals')
    .post(isLoggedIn, isAdmin, validateMealInput, addMeal)
    .get(getMeals)

mealRouter.route('/meals/:mealId')
    .put(isLoggedIn, isAdmin, validateMealInput, validateMealId, updateMeal)
    .delete(isLoggedIn, isAdmin, validateMealId, deleteMeal)
    .get(validateMealId, getMeal)

mealRouter.get('/:category/meals', getMealsByCat)

module.exports = mealRouter;