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
        
    },

 /**
 * Modify a meal
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json object
 * route '/meals:mealId'
 */
updateMeal(req, res){
    const mealId = req.params.mealId;
    Meals.findByIdAndUpdate(mealId, {$set : req.body})
        .then(() => {
            res.status(200).send({message: 'meal updated'})
        })
        .catch(err => res.status(500).send(err));
},

 /**
 * Delete a meal from the db
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json res
 * route '/meals:mealId'
 */
}

module.exports = mealController;