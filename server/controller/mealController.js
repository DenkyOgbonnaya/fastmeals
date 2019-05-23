const Meals = require('../model/mealsModel');
const Category = require('../model/categoryModel');
const fs = require('fs');
const path = require('path');
const {dataUri} = require('../controller/imageUploder');
const{uploader} = require('../services/cloudinary_setup');

const mealController = {
/**
 * Add a meal to the db
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} json object
 * @route '/meals'
 */
async addMeal(req, res){
    const{name, price, quantity, category, description} = req.body;
    if(req.file){
        try{
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            const meal = await Meals.create({
                name,
                price,
                quantity,
                category,
                description, 
                image: result.url,
                publicId: result.public_id
            })
            console.log(meal);
            return res.status(201).send({message: 'meal added', meal:meal})
        }catch(err){
            console.log('roo',err)
            res.status(400).send(err)
        }
    }else
    return res.status(400).send({message: 'input a meal image'})
        
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
        uploader.destroy(meal.publicId, (err, result) => {
            if(err) res.status(400).send(err);
            res.status(200).send({message: 'meal deleted', mealId});
        });
        
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
async getMeals(req, res){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 16;
    
    Meals.paginate({}, {page, limit})
    .then(result => {
        res.status(200).send({
            meals: result.docs,
            page: result.page,
            pages: result.pages,
            total: result.total
            });
    })
    .catch(err => res.status(500).send(err))
},
searchMeal(req, res){
    const{search, category} = req.query;
    const query = {};
    if(search)
        query.name = {$regex: search, $options: 'i'};
    if(category && category !== 'All')
        query.category = category
    
    Meals.find(query)
    .then(result => {
        if(result)
           return res.status(200).send({
               meals: result
            });
        return res.status(401).send({message: 'meal not found'})
        
    })
    .catch(err => {console.log(err), res.status(404).send(err)})
},
mealsInCategory(req, res){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 16;
    const{category} = req.params;

    Meals.paginate({category})
    .then(result => {
        res.status(200).send({
            meals: result.docs,
            page: result.page,
            pages: result.pages
        });
    })
    .catch(err => res.status(400).send(err))
    
},
mealsInDepartment(req, res){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 16;
    const{department} = req.params;

    Meals.paginate({department})
    .then(result => {
        res.status(200).send({
            meals: result.docs,
            page: result.page,
            pages: result.pages
        });
    })
    .catch(err => res.status(400).send(err))
    
}

}

module.exports = mealController;