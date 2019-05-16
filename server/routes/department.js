const deptRouter = require('express').Router();
const deptController = require('../controller/department');
const validation = require('../middleware/validation');

const{create, getDepts, updateDept } = deptController;
const{isLoggedIn, isAdmin, validateDeptInput} = validation;
deptRouter.route('/departments')
.post(validateDeptInput, isLoggedIn, isAdmin, create)
.get(getDepts)

deptRouter.route('/departments/:deptId')
.put(validateDeptInput, isLoggedIn, isAdmin, updateDept)

module.exports = deptRouter;