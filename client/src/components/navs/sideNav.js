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
            <Nav vertical >
                <NavItem> 
                    <NavLink to= '/cart' tag= {RRNavLink} className = 'navlink'> My cart </NavLink>
                </NavItem>
                {
                    user ?
                    <div>
                
                    <NavItem> 
                        <NavLink to= '/orders' tag= {RRNavLink} className = 'navlink' > My Orders </NavLink>
                    </NavItem>
                    <Can 
                    role = {user.isAdmin}
                    perform = "admin-board:visit"
                    yes = {() => 
                        <div> 
                            <NavItem> 
                                <NavLink to= '/addMeals' tag= {RRNavLink} className = 'navlink'> Add meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick= { () => addCategory() } className = 'navlink'> Add meal Category</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowUpdatMealsButton(true)} className = 'navlink'> Update meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowDeleteMealsButton(true)} className = 'navlink' > Delete meals </NavLink>
                            </NavItem>
                        </div>
                    }
                    />
                    
                    </div>
                    : null
                }
                <NavItem> 
                    <NavLink to= '/about' tag= {RRNavLink} className = 'navlink'>About </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;