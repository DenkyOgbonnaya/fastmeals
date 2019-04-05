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
            setCategories(categories.concat(category));
        })
    }

    return(
        <div className= 'sideNav'> 
            <Nav vertical className = "nav" >
                <NavItem> 
                    <NavLink to= '/cart' tag= {RRNavLink} className = 'menuLinks'>
                    <img src = "/images/icons/cart_ic.png" alt="delete" /> My cart </NavLink>
                </NavItem>
                {
                    user ?
                    <div>
                
                    <NavItem className = "nav"> 
                        <NavLink to= '/orders' tag= {RRNavLink} className = 'menuLinks' >
                        <img src = "/images/icons/order_ic.png" alt="delete" /> My Orders </NavLink>
                    </NavItem>
                    <Can 
                    role = {user.isAdmin}
                    perform = "admin-board:visit"
                    yes = {() => 
                        <div> 
                            <NavItem className = "nav"> 
                                <NavLink to= '/addMeals' tag= {RRNavLink} className = 'menuLinks'>
                                <img src = "/images/icons/add_ic.png" alt="delete" /> Add meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick= { () => addCategory() } className = 'menuLinks'>
                                <img src = "/images/icons/addcat_ic.png" alt="delete" /> Add meal Category</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowUpdatMealsButton(true)} className = 'menuLinks'>
                                <img src = "/images/icons/edit_ic.png" alt="delete" /> Update meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowDeleteMealsButton(true)} className = 'menuLinks' >
                                <img src = "/images/icons/delete_ic.png" alt="delete" /> Delete meals </NavLink>
                            </NavItem>
                        </div>
                    }
                    />
                    
                    </div>
                    : null
                }
                <NavItem> 
                    <NavLink to= '/about' tag= {RRNavLink} className = 'menuLinks'>
                    <img src = "/images/icons/about_ic.png" alt="delete" />About </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;