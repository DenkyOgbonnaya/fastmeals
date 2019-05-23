import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import CategoryView from './meals/categoryView';
import CartView from './cart/cartView';
import LoginForm from './userAuth/loginForm';
import SignupForm from './userAuth/signupForm';
import PrivateRoute from './userAuth/privateRoute';
import Profile from './userAuth/profile';
import Spinner from './utils/spinner';
const DeptDashboard = lazy(() => import('./admin/departments/deptDashboard'));
const CategDashboard = lazy(() => import('./admin/categories/categDashboard'));
const OrderView = lazy( () => import('./order/orderView'));
const ViewMeal = lazy( () => import('./meals/viewMeal'));
const OrderList = lazy( () => import('./order/orderList'));
const MealsView = lazy(() => import('./meals/mealsView'));
const ManageMeals = lazy( () => import('./admin/manageMeals'));
const Orders = lazy( () => import('./admin/orders/orders'));
const ListUsers = lazy( () => import('./admin/users/listUsers'));

const Container = () => 
<Suspense fallback= {<Spinner />} >
    <Switch> 
        <Route exact path = '/' component = { MealsView } />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/login' component = {LoginForm} />
        <Route exact path = '/signup' component = {SignupForm} />
        <PrivateRoute exact path = '/:userId/orders' component = {OrderList} />
        <PrivateRoute exact path = '/manageMeals' component = {ManageMeals } />
        <PrivateRoute exact path = '/orders' component = {Orders } />
        <PrivateRoute exact path = '/profile' component = {Profile} />
        <PrivateRoute exact path = '/users' component = {ListUsers} />
        <PrivateRoute exact path = '/order/:orderId' component = {OrderView} />
        <PrivateRoute exact path = '/departments' component = {DeptDashboard} />
        <PrivateRoute exact path = '/categories' component = {CategDashboard} />
        <Route exact path = '/meal/:mealId' component = {ViewMeal} />
        <Route exact path = '/category/:title' component = {CategoryView} />
        
    </Switch>
    </Suspense>

export default Container;
