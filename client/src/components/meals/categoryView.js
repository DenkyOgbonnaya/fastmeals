import React from 'react';
import MealList from './mealList';



const CategoryView = (props) => {
    const title = props.match.params.title;
    const api = `/api/meals/inCategory/${title}`;
    
    return (
        <div className = 'category'>
           
            <MealList api = {api} />
        </div>
    )
}
export default CategoryView;