const express = require('express');
const mealController = require('../controller/mealController');
const validation = require('../middleware/validation');

const mealRouter = express.Router();
const{addMeal, updateMeal, deleteMeal} = mealController;
const{validateMealInput, validateMealId} = validation;

mealRouter.route('/meals')
    .post(validateMealInput, addMeal);

mealRouter.route('/meals/:mealId')
    .put(validateMealInput, validateMealId, updateMeal)
    .delete(validateMealId, deleteMeal)

module.exports = mealRouter;