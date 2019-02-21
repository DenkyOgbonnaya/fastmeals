import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';

const SideNav = () => {

    return(
        <div> 
            <Nav vertical > 
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink to= '/' tag= {RRNavLink}> Order </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;