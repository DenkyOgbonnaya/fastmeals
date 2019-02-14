const express = require('express');
const userController = require('../controller/userController');
const valadation = require('../middleware/validation');
const orderController = require('../controller/orderController');

const userRouter = express.Router();
const{createUser, loginUser, addUserContact} = userController;
const{validateUserInput,
    checkEmailExist,
    checkUsernameExist,
    validateLoginInput,
    validateContactInput,
    isLoggedIn
} = valadation;
const{createOrder, getOrder} = orderController

userRouter.post('/signup', validateUserInput, checkEmailExist, checkUsernameExist, createUser);
userRouter.post('/login', validateLoginInput, loginUser)
userRouter.route('/:userId/orders')
    .post(isLoggedIn, createOrder)
    .get(isLoggedIn, getOrder)

userRouter.route('/:userId')
    .put(isLoggedIn, validateContactInput, addUserContact)

module.exports = userRouter;