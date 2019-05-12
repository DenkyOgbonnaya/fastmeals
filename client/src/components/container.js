import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MealsView from './meals/mealsView';
import CategoryView from './meals/categoryView';
import CartView from './cart/cartView';
import LoginForm from './userAuth/loginForm';
import Order from './order/orderList';
import OrderView from './order/orderView';
import ViewMeal from './meals/viewMeal';
import OrderList from './order/orderList';
import SignupForm from './userAuth/signupForm';
import PrivateRoute from './userAuth/privateRoute';
import ManageMeals from './admin/manageMeals';
import Orders from './admin/orders/orders';

const Container = () => 
    <Switch> 
        <Route exact path = '/' component = {MealsView} />
        <Route exact path = '/cart' component = {CartView} />
        <Route exact path = '/login' component = {LoginForm} />
        <Route exact path = '/signup' component = {SignupForm} />
        <PrivateRoute exact path = '/profile' component = {Order} />
        <PrivateRoute exact path = '/manageMeals' component = {ManageMeals} />
        <PrivateRoute exact path = '/orders' component = {Orders} />
        <PrivateRoute exact path = '/order/:orderId' component = {OrderView} />
        <Route exact path = '/meal/:mealId' component = {ViewMeal} />
        <Route exact path = '/category/:title' component = {CategoryView} />
        
    </Switch>

export default Container;
