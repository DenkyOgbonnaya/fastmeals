import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MealsView from './mealsView';
import CategoryView from './categoryView';
import CartView from './cartView';
import LoginForm from './userAuth/loginForm';
import AddMeals from './addMeals';
import Order from './orderView';
import ViewMeal from './viewMeal';
import Profile from './profileView';
import SignupForm from './userAuth/signupForm';
import PrivateRoute from './privateRoute'

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/login' component = {LoginForm} />
        <Route exact path = '/signup' component = {SignupForm} />
        <PrivateRoute exact path = '/addMeals' component = {AddMeals} />
        <PrivateRoute exact path = '/profile' component = {Profile} />
        <PrivateRoute exact path = '/order/:orderId' component = {Order} />
        <Route exact path = '/meal/:mealId' component = {ViewMeal} />
        <Route exact path = '/category/:title' component = {CategoryView} />
        
    </Switch>

export default Container;
