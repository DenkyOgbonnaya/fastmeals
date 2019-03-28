import React from 'react';
import MealList from './mealList';

const Meals = () => {
    const api = 'api/meals'

    return < MealList api = {api} />
}
export default Meals;