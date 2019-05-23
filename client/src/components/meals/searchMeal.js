import React, {useState, useEffect} from 'react';
import {Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import mealsApi from '../meals/meals_api';
import SearchList from './searchList';
import ListMeals from '../admin/listMeals';
import dataProvider from '../admin/categories/dataProvider';

const SearchMeal = (props) => {
    const[search, setSearch] = useState('');
    const[category, setCategory] = useState('All');
    const[result, setResult] = useState([]);
    const[categories, setCategories] = useState([]);

    useEffect( () => {
        dataProvider.getCategories()
        .then(data => setCategories(data.categories))
    }, [])
    const handleSearch = () => {
        if(search){
            mealsApi.searchMeal(search, category)
            .then(data => setResult(data.meals))
        }
    } 
    
    return(
        <div >
        <InputGroup>
        <InputGroupAddon addonType= 'prepend' >
            <Input type = 'select' name="category"  onChange = {e => setCategory(e.target.value)} > 
                <option key='All'> All </option>
                {categories.map(category => 
                <option key= {category._id} value= {category.name}  >{category.name} </option>)}
            </Input>
        </InputGroupAddon>
            <Input placeholder = 'Search meal...' value = {search} onChange = { e => setSearch(e.target.value)} />
            <InputGroupAddon addonType='append' ><Button style = {{background:'firebrick'}}
            onClick = {() => handleSearch()} >Search</Button></InputGroupAddon>
        </InputGroup>
        {result && (props.search === 'user') ? 
        <div> <hr /> <SearchList result = {result} /> </div> : 
        result.length > 0 && (props.search === 'admin') ? <ListMeals meals = {result} /> : 'No meals found for this search'
        }
        </div>
    )
}

export default SearchMeal;