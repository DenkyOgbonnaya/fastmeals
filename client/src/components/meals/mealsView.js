import React from 'react';
import MealList from './mealList';

const Meals = () => {
    const api = 'api/meals?page=1'

    return < MealList api = {api} />
}
export default Meals;