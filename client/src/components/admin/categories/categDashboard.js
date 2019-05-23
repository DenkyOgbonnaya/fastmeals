import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import CategoryForm from './categoryForm';
import ListCategories from './listCategories';
import dataProvider from './dataProvider';

//const categories = [{_id: 'hjsj', name: 'rice', department: 'food'}, {_id: 'fhff', name: 'Snacks', department: 'bakery'}]
const CategDashboard = () => {
    const[categories, setCategories] = useGlobal('categories');

    useEffect( () => {
        dataProvider.getCategories()
        .then(data => setCategories(data.categories))
    }, [])
    return (
        <div>
            <h5> New Category </h5> 
            <CategoryForm category = '' />
            <ListCategories categories  = {categories} />
        </div>
    )
}

export default CategDashboard;