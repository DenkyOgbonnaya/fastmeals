import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {
  Container, Row, Col, Input, NavLink, NavbarBrand, Navbar} from 'reactstrap';
  import {NavLink as RRNavLink, Link} from 'react-router-dom';

const NavBar = () => {
const[searchMeal, setSearchMeal] = useState('');
const[cart] = useGlobal('cart');
const[user, setUser] = useGlobal('currentUser');
const[showSideNav, setShowSideNav] = useGlobal('showSideNav')

const handleSearchChange = e => {
  setSearchMeal(e.target.value)
}
const logoutUser = () => {
  localStorage.removeItem('userToken');
  setUser(null);
}
  
    return (
      
        <Container> 
          <Row> 
          <Col xs = '7' md='10'> </Col>
            <Col xs = '5' md='2'> { user ? <div><Link to = '/profile'>{user.userName}</Link>  <Link to = '/' onClick = {() => logoutUser()} >Logout</Link></div> : 
            <div><Link to = '/login'>Login</Link>  <Link to = '/signup'>sign Up</Link></div>} </Col>
            <Col xs = '12' md='12'>
              <Row>
              <Col xs ='2' md= '1'> <img src='images/icons/menu_ic.png' alt='menu' onClick= {() => setShowSideNav(!showSideNav)} />  </Col>
                <Col xs ='4' md='3'> <NavbarBrand> Fastmeals </NavbarBrand> </Col>
                <Col xs = '3' md='6'> <Input placeholder='seach meal' value= {searchMeal} onChange= {handleSearchChange} /></Col>
                <Col xs = '3' md='2'><NavLink to= '/cart' tag={RRNavLink}> <img src='images/icons/shopping_cart.png' alt='cart' />
                <span style={{color:'white'}}  >{cart.length} </span>
                </NavLink>  </Col>
              </Row>
            </Col>
          
          </Row>
        </Container>
      
      
    );
  
}
export default NavBar;