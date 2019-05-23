import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import mealsApi from '../meals/meals_api';

const SideNav = () => {

    return(
        <div className= 'sideNav'>
        <div className = 'dashboard'>Admin Dashboard </div> 
        <hr />
            <Nav vertical className = "nav" >
                <NavItem className = "nav"> 
                    <NavLink to= '/manageMeals' tag= {RRNavLink} className = 'menuLinks'>
                        <img src = "/images/icons/meals_ic.png" alt="meals" /> Meals </NavLink>
                </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/orders' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/order_ic.png" alt="delete" /> Orders </NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/departments' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/department_ic.png" alt="departments" /> Departments</NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/categories' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/category_ic.png" alt="category" /> Categories</NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                        <NavLink to= '/users' tag= {RRNavLink} className = 'menuLinks' >
                        <img src = "/images/icons/users_ic.png" alt="delete" />Users </NavLink>
                    </NavItem>
                </Nav>
        </div>
    )
}
export default SideNav;