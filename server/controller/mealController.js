const Meals = require('../model/mealsModel');
const Category = require('../model/categoryModel');

const mealController = {
/**
 * Add a meal to the db
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....json object
 * route '/meals'
 */
    addMeal(req, res){
        const{name, price, quantity, category, description} = req.body;
       
        Meals.create({
            name,
            price,
            quantity,
            category,
            description,
            image: `public/images/meals/${req.file.filename}`
        })
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
deleteMeal(req, res){
    const mealId = req.params.mealId;
    Meals.findByIdAndRemove(mealId)
        .then(() => {
            res.status(200).send({message: 'meal deleted'});
        })
        .catch(err => res.status(500).send(err))
},
/**
 * Get a meal by id
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....meal object.
 * route '/meals:mealId'
 */
getMeal(req, res){
    const mealId = req.params.mealId;
    Meals.findById(mealId)
        .then(meal => {
            res.status(200).send({meal});
        })
        .catch(err => res.status(500).send(err))
},
/**
 * Get all meals
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....meals object.
 * route '/meals:meals'
 */
getMeals(req, res){
    Meals.find({})
    .then(meals => {
        res.status(200).send({meals});
    })
    .catch(err => res.status(500).send(err))
},
/**
 * Get meals by category
 * @param req {obj} ....request object
 * @param res {obj} ....response object
 * @return {obj} ....meals object.
 * route '/:category/meals'
 */
    getMealsByCat(req, res){
        const mealCategory = req.params.category;
        Category.findOne({title: mealCategory})
        .then(category => {
            return  Meals.find({category: category.title})
        })
        .then(meals => {
            if(!meals)
                return res.status(204).send({message: 'There are no meals at the moment'});
            res.status(200).send({meals})
        })
        .catch(err => res.status(500).send(err))
    }
}

module.exports = mealController;