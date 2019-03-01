const Users = require('../model/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validation = {

    /**
    * validates the signup data
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
    validateUserInput(req, res, next){
        const{userName, email, password} = req.body;
        const errorMessage = [];

        if(userName.length === 0)
            errorMessage.push('userName can not be blank');
        if(!/\S+@\S+\.\S+/.test(email))
            errorMessage.push('valid email required');
        if(password.length === 0 )
            errorMessage.push('password can not be blank');

        if(errorMessage.length > 0)
            return res.status(403).send({authenticated: false, message: errorMessage});

        next();
    },
    /** 
    *check if userName already exist
    *  @param req request object
    *  @param res response object
    *  @param next next middleware
    */
   checkUsernameExist(req, res, next){
    Users.findOne({userName: req.body.userName})
    .then(user =>{
        if(user)
            return res.status(443).send({authenticated: false, message: 'The userName already exist'});

        next();
    })
   },

    /** 
    *check if email already exist
    *  @param req request object
    *  @param res response object
    *  @param next next middleware
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
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
   validateLoginInput(req, res, next){
       const{email, password} = req.body;
       const errorMessage = [];
       
       if(!/\S+@\S+\.\S+/.test(email))
            errorMessage.push('valid emailssed required');
        if(password.length === 0 )
            errorMessage.push('password can not be blank');

        if(errorMessage.length > 0)
            return res.status(403).send({authenticated: false, message: errorMessage});

        next();
    },
    /**
    * validates the meal data
    * @param req request object
    * @param res response object
    * @param next next middleware
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
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
   validateMealId(req, res, next){
       const mealId = req.params.mealId;
       const isValidId = mongoose.Types.ObjectId.isValid(mealId);

       if(!isValidId)
            return res.status(422).send({message: 'not a valid meal id'});
        next();
   },
   /**
    * validates contact data
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
   validateContactInput(req, res, next){
    const{firstName, lastName, phone, street, town, state} = req.body;
    const errorMessage = [];

    if(firstName.length < 3)
        errorMessage.push('first name is too short');
     if(firstName.length < 3 )
        errorMessage.push('last name too short');
     if(!/[0-9]{11}/.test(phone))
        errorMessage.push('Enter 11 digits phone number');
     if(street.length < 7)
        errorMessage.push('street is too short');
    if(town.length < 5)
        errorMessage.push('town is too short');
    if(state.length < 4)
        errorMessage.push('state is too short');

     if(errorMessage.length > 0 )
         return res.status(406).send({message: errorMessage})

     next();
},
/**
    * checks if it's an authorized user
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
isLoggedIn(req, res, next){
    const token = req.headers['authorization'].substring(7).replace(/"/g, '');

    if(!token) return res.status(403 ).send({message: 'unauthorized user'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) 
            return res.status(403).send({message: 'unauthorized user.'})
    
        next();
    });
},
/**
    * checks if logged in user is admin
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
isAdmin(req, res, next){
    const token = req.headers['authorization'].substring(7).replace(/"/g, '');
    const decoded = jwt.decode(token);
    console.log(decoded.currentUser)

    if(decoded.currentUser.isAdmin === 1)
        return res.status(403).send({message: 'unauthorized user'})

    next();
}
}
module.exports = validation;