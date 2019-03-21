const express = require('express');
const userController = require('../controller/userController');
const valadation = require('../middleware/validation');
const orderController = require('../controller/orderController');

const userRouter = express.Router();
const{createUser, loginUser} = userController;
const{validateUserInput,
    checkEmailExist,
    checkUsernameExist,
    validateLoginInput,
    validateContactInput,
} = valadation;

userRouter.post('/signup', validateUserInput, checkEmailExist, checkUsernameExist, createUser);
userRouter.post('/login', validateLoginInput, loginUser)


module.exports = userRouter;