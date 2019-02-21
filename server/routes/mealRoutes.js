const express = require('express');
const mealController = require('../controller/mealController');
const validation = require('../middleware/validation');
const multer = require('multer');
const upload = require('../controller/imageUploder')

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

mealRouter.post('/meals', upload.single('image'), isLoggedIn, isAdmin, addMeal)
mealRouter.get('/meals', getMeals)

mealRouter.route('/meals/:mealId')
    .put(isLoggedIn, isAdmin, validateMealInput, validateMealId, updateMeal)
    .delete(isLoggedIn, isAdmin, validateMealId, deleteMeal)
    .get(validateMealId, getMeal)


module.exports = mealRouter;