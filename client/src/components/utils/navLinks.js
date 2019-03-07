import React, {useState, useEffect} from 'react';
import {NavLink } from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css'

const NavLinks = () => {
    const[categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('api/categories')
        .then(res => {
            if(res.status === 200) return res.json()
        })
        .then(data => {
            setCategories(data.categories)
        })
        .catch(err => console.log(err))
    }, [ ])

    return(
        <ul> 
            <li> <NavLink to='/' tag = {RRNavLink}>All </NavLink> </li>
            {categories.map(category => 
              <li key = {category.id} >
                <NavLink to = {`/${category.title}`} tag = {RRNavLink}
                 >{category.title}</NavLink>
              </li>
            )}
        </ul>
    )
}
export default NavLinks;