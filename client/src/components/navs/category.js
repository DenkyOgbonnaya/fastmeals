import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink } from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css';
import dataProvider from '../admin/categories/dataProvider';

const Category = () => {
    const[categories, setCategories] = useGlobal('categories');
    useEffect(() => {
        dataProvider.getCategories('food')
        .then(data => setCategories(data.categories) 
        )
    }, [ ])

    return(
        <ul className = 'navs'> 
            <li> <NavLink to='/' tag = {RRNavLink}  className='navlink' >All </NavLink> </li>
            {categories.length > 0 ?
            categories.map(category => 
              <li key = {category._id} >
                <NavLink to = {`/category/${category.name}`} tag = {RRNavLink}
               className='navlink' >{category.name}</NavLink>
              </li>
            )
            : null
        }
        </ul>
    )
}
export default Category;