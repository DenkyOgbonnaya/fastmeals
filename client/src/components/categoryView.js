import React from 'react';
import Cards from './utils/card';

const CategoryView = () => {
    const api = `api/${window.location.pathname}/category`
   // const meals = useGetMeals(api);
    
    return (<Cards api = {api} />)
}
export default CategoryView;