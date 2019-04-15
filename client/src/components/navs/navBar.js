import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {
  Container, Row, Col, Input, NavLink, NavbarBrand, Button, Navbar} from 'reactstrap';
  import {NavLink as RRNavLink, Link} from 'react-router-dom';
import SearchField from '../utils/searchField';

const NavBar = () => {
const[searchedMeal, setSearchedMeal] = useGlobal('searchedMeal');
const[cart] = useGlobal('cart');
const[user, setUser] = useGlobal('currentUser');
const[showSideNav, setShowSideNav] = useGlobal('showSideNav')

const handleSearchChange = e => {
  setSearchedMeal(e.target.value)
}
const logoutUser = () => {
  localStorage.removeItem('userToken');
  setUser(null);
}
  
    return (
      
        <Container> 
          <Row> 
          <Col xs = '6' md='10'> </Col>
            <Col xs = '6' md='2'> { user ? <div className= 'right'><Link to = '/orders' className = 'link'>{user.userName}</Link>  <Link to = '/' onClick = {() => logoutUser()} className = 'link'>Logout</Link></div> : 
            <div className= 'right' ><Link to = '/login' className = 'link'>Login</Link>  <Link to = '/signup' className = 'link'>sign Up</Link></div>} </Col>
            <Col xs = '12' md='12'>
              <Row>
              <Col xs ='2' md= '1'> <img src='images/icons/menu_ic.png' alt='menu' onClick= {() => setShowSideNav(!showSideNav)} className='menu'/>  </Col>
                <Col xs ='6' md='9'> <NavbarBrand > Fastmeals </NavbarBrand> </Col>
                <Col xs = '4' md='2'> <div className = 'right'><NavLink to= '/cart' tag={RRNavLink}> <img src='images/icons/shopping_cart.png' alt='cart' />
                <span style={{color:'white'}}  >{cart.length} </span>
                </NavLink> </div> </Col>
              </Row>
            </Col>
            <Col xs= '10' md= '7'>  <SearchField /> </Col>
          </Row>
        </Container>
      
      
    );
  
}
export default NavBar;