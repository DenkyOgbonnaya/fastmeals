const Users = require('../model/userModel');
const mongoose = require('mongoose');

const validation = {

    /**
    * validates the signup data
    * @param req .....request object
    * @param res .....response object
    * @param next ....next middleware
    */
    validateUserInput(req, res, next){
        const{firstName, lastName, email, password} = req.body;
        const errorMessage = [];

        if(firstName.length === 0)
            errorMessage.push('first name can not be blank')
            
        if(lastName.length === 0)
            errorMessage.push('last name can not be blank');
        if(!/\w+@./.test(email))
            errorMessage.push('valid email required');
        if(password.length === 0 )
            errorMessage.push('password can not be blank');

        if(errorMessage.length > 0)
            return res.status(403).send({authenticated: false, message: errorMessage});

        next();
    },

    /** 
    *check if email already exist
    *  @param req ....request object
    *  @param res .....response object
    *  @param next ....next middleware
    */
   checkEmailExist(req, res, next){
    Users.findOne({email: req.body.email})
    .then(user =>{
        if(user)
            return res.status(443).send({authenticated: false, message: 'The email already exist'});

        next();
    })
   },

   /**
    * validates the login data
    * @param req .....request object
    * @param res .....response object
    * @param next ....next middleware
    */
   validateLoginInput(req, res, next){
       const{email, password} = req.body;
       const errorMessage = [];
       
       if(!/\w+@./.test(email))
            errorMessage.push('valid email required');
        if(password.length === 0 )
            errorMessage.push('password can not be blank');

        if(errorMessage.length > 0)
            return res.status(403).send({authenticated: false, message: errorMessage});

        next();
    },
    /**
    * validates the meal data
    * @param req .....request object
    * @param res .....response object
    * @param next ....next middleware
    */
   validateMealInput(req, res, next){
       const{name, price, quantity, category} = req.body;
       const errorMessage = [];

       if(name.length < 3)
            errorMessage.push('A proper meal name is required');
        if(!/^[\d.,]+$/.test(price) )
            errorMessage.push('Enter a fiqure for meal price');
        if(!/[0-9]+/.test(quantity))
            errorMessage.push('Enter a fiqure for meal quantity');
        if(category.length < 3)
            errorMessage.push('A proper category name is required');
        
        if(errorMessage.length > 0 )
            return res.status(406).send({message: errorMessage})

        next();
   },
   /**
    * validates the meal id
    * @param req .....request object
    * @param res .....response object
    * @param next ....next middleware
    */
   validateMealId(req, res, next){
       const mealId = req.params.mealId;
       const isValidId = mongoose.Types.ObjectId.isValid(mealId);

       if(!isValidId)
            return res.status(422).send({message: 'not a valid meal id'});
        next();
   }
}
module.exports = validation;