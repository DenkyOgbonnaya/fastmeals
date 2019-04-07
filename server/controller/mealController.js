const Meals = require('../model/mealsModel');
const Category = require('../model/categoryModel');
const fs = require('fs');
const path = require('path');

const mealController = {
/**
 * Add a meal to the db
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} json object
 * @route '/meals'
 */
addMeal(req, res){
    const{name, price, quantity, category, description} = req.body;
    Meals.create({
        name,
        price,
        quantity,
        category,
        description,
        image: `/uploads/${req.file.filename}`
    })
    .then((meal) => {
        Category.findOne({title: category})
        .then(cat => {
            cat.meals.push(meal._id)
            cat.save();
            res.status(201).send({message: 'meal added', meal:meal})
        })
    })
    .catch(err => res.status(500).send(err));
        
},

 /**
 * Modify a meal
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} json object
 * @route '/meals:mealId'
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
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} json res
 * @route '/meals:mealId'
 */
deleteMeal(req, res){
    const mealId = req.params.mealId
    Meals.findByIdAndRemove(mealId)
    .then((meal) => {
        const image = JSON.stringify(meal.image).replace('/', '')
        const img = path.resolve("public", image).replace(/\"/g, '')

        fs.unlink(img, (err) => {
            if(err){
                console.log('err',err)
            }else {
                res.status(200).send({message: 'meal deleted', mealId});
            }
        })
    })
    .catch(err => {console.log(err),res.status(500).send(err)})
},
/**
 * Get a meal by id
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} meal object.
 * @route '/meals:mealId'
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
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} meals object.
 * @route '/meals:meals'
 */
getMeals(req, res){
    const page = Number(req.query.page);
    const limit = 2;
    Meals.find({})
    .skip((page * limit) - limit)
    .limit(limit)
    .then(meals => {
        Meals.countDocuments()
        .then(count => {
            res.status(200).send({
                meals: meals,
                currentPage: page,
                pages: Math.ceil(count/limit)
            });
        })
        
    })
    .catch(err => res.status(500).send(err))
},

}

module.exports = mealController;