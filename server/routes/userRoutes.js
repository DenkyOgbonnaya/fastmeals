const express = require('express');
const userController = require('../controller/userController');
const valadation = require('../middleware/validation');
const orderController = require('../controller/orderController');

const userRouter = express.Router();
const{createUser, loginUser, getUsers} = userController;
const{validateUserInput,
    checkEmailExist,
    checkUsernameExist,
    validateLoginInput,
    validateContactInput,
    isLoggedIn,
    isAdmin
} = valadation;

userRouter.post('/signup', validateUserInput, checkEmailExist, checkUsernameExist, createUser);
userRouter.post('/login', validateLoginInput, loginUser);
userRouter.get('/', isLoggedIn, isAdmin, getUsers)



module.exports = userRouter;