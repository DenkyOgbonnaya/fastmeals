const Users = require('../model/userModel');

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
    }
}
module.exports = validation;