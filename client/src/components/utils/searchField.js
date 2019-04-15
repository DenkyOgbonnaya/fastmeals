import React, {useState} from 'react';
import {Form, Input, Button, InputGroup, InputGroupAddon} from 'reactstrap';

const SearchField = () => {
    const[seachedMeal, setSearchedMeal] = useState('');

    const handleSearch = e => {
        e.preventDefault();


    }

    return(
        <InputGroup> 
            <Input placeholder = 'Search here...' />
            <InputGroupAddon addonType='prepend' ><Button>Search</Button></InputGroupAddon>
        </InputGroup>
    )
}

export default SearchField;