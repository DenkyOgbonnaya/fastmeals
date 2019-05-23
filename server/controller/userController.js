const Users = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const _ = require('lodash')

const authController = {

    /** 
    * Add a new user to the db
    * @param req{obj} request 
    * @param res{obj} response
    * @return {obj} jwt
    * @route '/signup'
    */
    createUser(req, res){
        const{userName, email, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        Users.create({
            userName,
            email,
            password: hashedPassword
        })
        .then(user => {
            const token = jwt.sign(
                {currentUser: _.pick(user, "_id", "userName", "email", "isAdmin", "isBanned") },
                process.env.SECRET_KEY,  
            )
            return res.status(201).send({
                token,
                message: 'new user created'
            })
        })
        .catch(err => res.status(500).send(err))
    },
    /** 
    * login user
    * @param req{obj} request
    * @param req{obj} request
    * @return {obj} jwt
    * @route '/login'
    */
   loginUser(req, res){
       const{email, password} = req.body;

       Users.findOne({email})
       .then(user => {
           if(!user)
                return res.status(403).send({
                authenticated: false,
                message: 'incorrect email and password combination'
        })
          const validPassword = bcrypt.compareSync(password, user.password);

          if(!validPassword)
               return res.status(403).send({
                   authenticated: false,
                   message: 'incorrect email and password combination'
               })
            const token = jwt.sign(
                {currentUser: _.pick(user, "_id", "userName", "email", "isAdmin", "isBanned")},
                process.env.SECRET_KEY
            )
            return token;
       })
       .then(token => {
           res.status(200).send({
               token,
               authenticated: true,
               message: 'login successfull'
           })  
       }).catch(err => res.status(500).send(err))
    },
    getUsers(req, res){
        Users.find({})
        .then(users => {
            if(users){
                const data = users.map(user => _.pick(user, "_id", "userName", "email") ) ;
                res.status(200).send({users: data})
            }
        })
        .catch(err => res.status(400).send(err))
    }
    

}
module.exports= authController;