import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {setGlobal} from 'reactn';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
    currentUser : {},
    isAuthUser: false,
    cart: [],
    meals: [],
    searchedMeal: '',
    mealId: '',
    categories: [],
    departments: [],
    showContactModal: false,
    showSideNav: false,
    showMealModal: false,
    isProcessing: false
})
ReactDOM.render(
    <Router> 
        <div> <App /> </div>
    </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
