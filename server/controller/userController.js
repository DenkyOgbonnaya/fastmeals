const Users = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const omit = require('../modules/omit');
require('dotenv').config();

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
                {currentUser: omit(user) },
                process.env.SECRET_KEY,
                {expiresIn: '24h'}   
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
                {currentUser: omit(user)},
                process.env.SECRET_KEY,
                {expiresIn: '24h'}
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
    /** 
    * add a contact details to a user
    * @param req{obj} request
    * @param req{obj} request
    * @route '/userId'
    */
    addUserContact(req, res){
        const contact = req.body

        Users.findById(req.params.userId)
        .then(user => {
            user.contact = contact;
            return user.save();
        })
        .then((user) => res.status(200).send({message: 'çontact added', contact: user.contact}))
        .catch(err => res.status(500).send(err) )
    },
    

}
module.exports= authController;