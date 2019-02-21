import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MealsView from './mealsView';
import CategoryView from './categoryView';
import CartView from './cartView';

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/Snacks' component = {CategoryView} />
    </Switch>

export default Container;
