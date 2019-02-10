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
const{validateMealInput, validateMealId} = validation;

mealRouter.route('/meals')
    .post(validateMealInput, addMeal)
    .get(getMeals)

mealRouter.route('/meals/:mealId')
    .put(validateMealInput, validateMealId, updateMeal)
    .delete(validateMealId, deleteMeal)
    .get(validateMealId, getMeal)

mealRouter.get('/:category/meals', getMealsByCat)

module.exports = mealRouter;