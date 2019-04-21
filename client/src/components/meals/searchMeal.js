import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import mealsApi from '../meals/meals_api';
import MealList from '../meals/mealList'
import SearchList from './searchList';

const SearchMeal = () => {
    const[search, setSearch] = useState('');
    const[category, setCategory] = useState('All');
    const[result, setResult] = useState([]);
    const[categories] = useGlobal('categories');

    const handleSearch = () => {
        mealsApi.searchMeal(search, category)
        .then(data => setResult(data.meals))
    } 
    
    return(
        <div >
        <InputGroup>
        <InputGroupAddon addonType= 'prepend' >
            <Input type = 'select' name="category"  onChange = {e => setCategory(e.target.value)} > 
                <option> All </option>
                {categories.map(category => 
                <option value= {category.title}  key= {category.id}>{category.title} </option>)}
            </Input>
        </InputGroupAddon>
            <Input placeholder = 'Search meal...' value = {search} onChange = { e => setSearch(e.target.value)} />
            <InputGroupAddon addonType='append' ><Button onClick = {() => handleSearch()} >Search</Button></InputGroupAddon>
        </InputGroup>
        {result ? 
        <div> <hr /> <SearchList result = {result} /> </div>: <div style={{color: 'red'}}>No meals found for this search </div> }
        </div>
    )
}

export default SearchMeal;