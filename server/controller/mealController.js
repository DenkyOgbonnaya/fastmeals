const Meals = require('../model/mealsModel');

const mealController = {
/**
 * Add a meal to the db
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json object
 * route '/meals'
 */
    addMeal(req, res){
        const meal = req.body;
        Meals.create(meal)
        .then(() => {
            res.status(201).send({message: 'meal added'})
        })
        .catch(err => res.status(500).send(err));
        
    }

 /**
 * Modify a meal
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json object
 * route '/meals:mealId'
 */

 /**
 * Delete a meal from the db
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json res
 * route '/meals:mealId'
 */
}

module.exports = mealController;