import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {withRouter} from 'react-router-dom';
import {Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import mealsApi from '../meals/meals_api';
import MealList from '../meals/mealList'

const SearchField = props => {
    const[search, setSearch] = useState('');
    const[category, setCategory] = useState('All');
    const[result, setResult] = useState([]);
    const[categories] = useGlobal('categories');
    const[displaySearch, setDisplaySearch] = useState(false);

    const handleSearch = () => {
        setDisplaySearch(true)
    } 
    const renderSearch = () => <MealList api = {`/api/meal?search=${search}&category=${category}`} />
   
    
    return(
        <div>
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
        {displaySearch ? renderSearch() : null}
        </div>
    )
}

export default withRouter(SearchField);