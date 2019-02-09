const express = require('express');
const userController = require('../controller/userController');
const valadation = require('../middleware/validation');

const userRouter = express.Router();
const{createUser, loginUser} = userController;
const{validateUserInput, checkEmailExist, validateLoginInput} = valadation;

userRouter.post('/signup', validateUserInput, checkEmailExist, createUser);
userRouter.post('/login', validateLoginInput, loginUser)

module.exports = userRouter;