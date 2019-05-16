import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {useGlobal} from 'reactn';
import Can from '../utils/can';
import mealsApi from '../meals/meals_api';

const SideNav = () => {
    const[user] = useGlobal('currentUser');
    const[categories, setCategories] = useGlobal('categories');
    const[showUpdateMealsButton, setShowUpdatMealsButton] = useGlobal('showUpdateMealsButton');
    const[showDeleteMealsButton, setShowDeleteMealsButton] = useGlobal('showDeleteMealsButton');

    const addCategory = () => {
        mealsApi.addCategory()
        .then(category => {
            if(category)
            setCategories(categories.concat(category));
        })
    }

    return(
        <div className= 'sideNav'>
        <div className = 'dashboard'>Admin Dashboard </div> 
        <hr />
            <Nav vertical className = "nav" ><div> 
                <NavItem className = "nav"> 
                    <NavLink to= '/manageMeals' tag= {RRNavLink} className = 'menuLinks'>
                        <img src = "/images/icons/admin_ic.png" alt="admin" /> Meals </NavLink>
                </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/orders' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/order_ic.png" alt="delete" /> Orders </NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/departments' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/order_ic.png" alt="delete" /> Departments</NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                    <NavLink to= '/categories' tag= {RRNavLink} className = 'menuLinks' >
                    <img src = "/images/icons/order_ic.png" alt="delete" /> Categories</NavLink>
                    </NavItem>
                    <NavItem className = "nav"> 
                        <NavLink to= '/users' tag= {RRNavLink} className = 'menuLinks' >
                        <img src = "/images/icons/order_ic.png" alt="delete" />Users </NavLink>
                    </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick= { () => addCategory() } className = 'menuLinks'>
                                <img src = "/images/icons/addcat_ic.png" alt="delete" /> Add meal Category</NavLink>
                            </NavItem>
                        </div>
                <hr />
                <NavItem> 
                    <NavLink to= '/about' tag= {RRNavLink} className = 'menuLinks'>
                    <img src = "/images/icons/about_ic.png" alt="delete" /> Logout </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;