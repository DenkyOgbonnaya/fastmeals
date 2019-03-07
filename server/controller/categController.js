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
        Category.find({})
        .then(categories => {
            const titles = categories.map(category => {
                return {title: category.title, id: category._id}
            })
            res.status(200).send({categories: titles});
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
    const mealCategory = req.params.category;
    Category.findOne({title: mealCategory})
    .populate('meals')
    .then(category => {
        res.status(200).send({meals: category.meals})
    })
    .catch(err => res.status(500).send(err))
},
addCategory(req, res){
    const title = req.body.title;
    if(!title)
        return res.status(400).send({message: 'specify a title'})
    Category.findOne(req.body)
    .then(category => {
        if(category)
            return res.status(208).send({message: 'Category already exist'});
        return Category.create(req.body)
    })
    .then( () => {
        return res.status(200).send({message: 'New Category added'});
    })
    .catch(err => res.status(500).send(err))
}
}
module.exports = categoryController