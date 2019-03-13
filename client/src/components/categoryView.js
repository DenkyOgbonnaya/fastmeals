import React from 'react';
import Cards from './utils/card';

const CategoryView = (props) => {
    const title = props.match.params.title;
    const api = `/api/category/${title}`;
    
    return (<Cards api = {api} />)
}
export default CategoryView;