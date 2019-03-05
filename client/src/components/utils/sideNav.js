import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';

const SideNav = () => {

    return(
        <div> 
            <Nav vertical > 
                <NavItem> 
                    <NavLink to= '/cart' tag= {RRNavLink}> My cart </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> My orders </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/addMeals' tag= {RRNavLink}> Add meals </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Add meal Category</NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;