import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import mealsApi from '../meals/meals_api';
import MealList from '../meals/mealList'
import SearchList from './searchList';
import ListMeals from '../admin/listMeals';

const SearchMeal = (props) => {
    const[search, setSearch] = useState('');
    const[category, setCategory] = useState('All');
    const[result, setResult] = useState([]);
    const[categories] = useGlobal('categories');

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
                <option> All </option>
                {categories.map(category => 
                <option value= {category.title}  key= {category.id}>{category.title} </option>)}
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