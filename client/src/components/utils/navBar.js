import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {
  Container, Row, Col, Input, NavLink, NavbarBrand, Navbar} from 'reactstrap';
  import {NavLink as RRNavLink} from 'react-router-dom';

const NavBar = () => {
const[searchMeal, setSearchMeal] = useState('');
const[cart] = useGlobal('cart');
const[showSideNav, setShowSideNav] = useGlobal('showSideNav')

const handleSearchChange = e => {
  setSearchMeal(e.target.value)
}
  
    return (
      <Navbar>
        <Container> 
          <Row>             
            <Col xs ='2' md= '1'> <img src='images/icons/menu_ic.png' alt='menu' onClick= {() => setShowSideNav(!showSideNav)} />  </Col>
            <Col xs ='3' md='3'> <NavbarBrand> Fastmeals </NavbarBrand> </Col>
            <Col xs = '3' md='6'> <Input placeholder='seach meal' value= {searchMeal} onChange= {handleSearchChange} /></Col>
            <Col xs = '2' md='1'><NavLink to= '/cart' tag={RRNavLink}> <img src='images/icons/shopping_cart.png' alt='cart' />  </NavLink>  </Col>
            <Col xs = '1' md='1' style={{color:'white'}} > {cart.length}</Col>
          </Row>
        </Container>
      </Navbar>
      
    );
  
}
export default NavBar;