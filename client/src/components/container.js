import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MealsView from './mealsView';
import CategoryView from './categoryView';
import CartView from './cartView';
import LoginForm from './userAuth/loginForm';
import AddMeals from './addMeals';

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/Snacks' component = {CategoryView} />
        <Route exact path = '/login' component = {LoginForm} />
        <Route exact path = '/addMeals' component = {AddMeals} />
    </Switch>

export default Container;
