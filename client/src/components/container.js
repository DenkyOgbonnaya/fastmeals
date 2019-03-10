import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MealsView from './mealsView';
import CategoryView from './categoryView';
import CartView from './cartView';
import LoginForm from './userAuth/loginForm';
import AddMeals from './addMeals';
import Orders from './orderView';
import ViewMeal from './viewMeal';

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/login' component = {LoginForm} />
        <Route exact path = '/addMeals' component = {AddMeals} />
        <Route exact path = '/orders' component = {Orders} />
        <Route exact path = '/meal' component = {ViewMeal} />
        <Route exact path = {`${window.location.pathname}`} component = {CategoryView} />
        
    </Switch>

export default Container;
