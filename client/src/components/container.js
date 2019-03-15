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

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/authenticate' component = {LoginForm} />
        <Route exact path = '/addMeals' component = {AddMeals} />
        <Route exact path = '/profile' component = {Profile} />
        <Route exact path = '/order/:orderId' component = {Order} />
        <Route exact path = '/meal/:mealId' component = {ViewMeal} />
        <Route exact path = '/category/:title' component = {CategoryView} />
        
    </Switch>

export default Container;
