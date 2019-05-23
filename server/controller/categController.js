const Category = require('../model/categoryModel');

categoryController = {
    /**
 * Get categories
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} categories 
 * @route '/category'
 */
    getCategories(req, res){
        const{department} = req.query;
        let query = {};
        if(department)
            query.department = department;
        Category.find(query)
        .then(categories => {
            res.status(200).send({categories});
        })
        .catch(err => res.status(500).send(err))
    },
    /**
 * Get meals by category
 * @param req {obj} request object
 * @param res {obj} response object
 * @return {obj} meals 
 * @route '/:category/category'
 */
getMealsByCat(req, res){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const title = req.params.title;
    Category.findOne({title})
    .populate('meals')
    .then(category => {
        const meals = category.meals;
        const from =  (page*limit)-limit;
        const to = limit + from;
        const currentMeals = meals.slice(from, to);

        res.status(200).send({
            meals: currentMeals,
            page,
            pages: Math.ceil(meals.length/limit)
        })
    })
    .catch(err => res.status(500).send(err))
},
addCategory(req, res){
    const name = req.body.name.toLowerCase();
    const department = req.body.department;
    if(name.length === 0 || department.length === 0)
        return res.status(400).send({message: 'specify a name and department'})
    Category.findOne({name})
    .then(category => {
        if(category)
            return res.status(208).send({message: 'Category already exist'});
        return Category.create({name, department})
    })
    .then( (newCategory) => {
        return res.status(201).send({message: 'New Category added', newCategory});
    })
    .catch(err => res.status(500).send(err))
},
async updateCategory(req, res){
    const{categoryId} = req.params;
    const {department, name} = req.body;

    try{
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {$set: {name, department}})
        res.status(200).send({updatedCategory});
    }catch(err){
        res.status(500).send(err)
    }
},
async categoriesInDept(req, res){
    const{department} = req.params;
    try{
        const categories = await Category.find({department});
        res.status(200).send({categories})
    }catch(err){
        res.status(400).send(err)
    }
}
}
module.exports = categoryController