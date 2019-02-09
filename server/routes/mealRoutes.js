const express = require('express');
const mealController = require('../controller/mealController');
const validation = require('../middleware/validation');

const mealRouter = express.Router();
const{addMeal} = mealController;
const{validateMealInput} = validation;

mealRouter.route('/meals')
    .post(validateMealInput, addMeal);

module.exports = mealRouter;