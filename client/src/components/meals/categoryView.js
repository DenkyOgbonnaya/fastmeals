import React from 'react';
import MealList from './mealList';

const CategoryView = (props) => {
    const title = props.match.params.title;
    const api = `/api/category/${title}`;
    
    return <MealList api = {api} />
}
export default CategoryView;