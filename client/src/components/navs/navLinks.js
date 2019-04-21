import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink } from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css';
import mealApi from '../meals/meals_api';

const NavLinks = () => {
    const[categories, setCategories] = useGlobal('categories');
    useEffect(() => {
        mealApi.getCategories()
        .then(data => setCategories(data.categories) 
        )
    }, [ ])

    return(
        <ul> 
            <li> <NavLink to='/' tag = {RRNavLink}  className='navlink' >All </NavLink> </li>
            {categories.map(category => 
              <li key = {category.id} >
                <NavLink to = {`/category/${category.title}`} tag = {RRNavLink}
               className='navlink' >{category.title}</NavLink>
              </li>
            )}
        </ul>
    )
}
export default NavLinks;