import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink } from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css'

const NavLinks = () => {
    const[categories, setCategories] = useGlobal('categories');
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