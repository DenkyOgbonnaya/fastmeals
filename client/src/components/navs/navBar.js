import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {
  Container, Row, Col, NavLink, NavbarBrand, 
Dropdown, DropdownItem, DropdownMenu, DropdownToggle, } from 'reactstrap';
  import {NavLink as RRNavLink, Link, withRouter} from 'react-router-dom';
  import Can from '../utils/can';

const NavBar = props => {
const[cart] = useGlobal('cart');
const[user, setUser] = useGlobal('currentUser');
const[showSideNav, setShowSideNav] = useGlobal('showSideNav');
const[dropdownOpen, setDropDownOpen] = useState(false);


const logoutUser = () => {
  localStorage.removeItem('userToken');
  setUser(null);
  props.history.push('/')
}
  
    return (
      
        <Container> 
          <Row> 
            <Col xs = '6' md='10'> </Col>
            <Col xs = '6' md='2'> 
            { user ?
              <Dropdown nav isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)}className= 'right' >
            <DropdownToggle caret style = {{background: '#8bc34a', color: '#424242'}}>
              {user.userName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Dashboard  </DropdownItem>
              <DropdownItem onClick = {() => props.history.push('/profile')}> Profile </DropdownItem>
              <DropdownItem onClick = {() => props.history.push(`/${user._id}/orders`)}>Orders</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick = {() => logoutUser()} > Logout </DropdownItem>
            </DropdownMenu>
          </Dropdown>
             :
            <div className= 'right' ><Link to = '/login' className = 'link'>Login</Link>  <Link to = '/signup' className = 'link'>sign Up</Link></div>
          
            } 
             </Col>
            <Col xs = '12' md='12'>
              <Row>
                <Can 
                role= {user ? user.isAdmin : 0}
                perform = 'menuIcon:see'
                yes = { () => <Col xs ='2' md= '1'> <img src='images/icons/menu_ic.png' alt='menu' onClick= {() => setShowSideNav(!showSideNav)} className='menu'/>  </Col> }
                />
              
                <Col xs ='6' md='9'> <NavbarBrand onClick ={ () => props.history.push('/')} style = {{fontSize:'25px', cursor: 'pointer'}}> FastMeals </NavbarBrand> </Col>
                <Col xs = '4' md='2'> <div className = 'right'><NavLink to= '/cart' tag={RRNavLink}> <img src='images/icons/shopping_cart.png' alt='cart' />
                <span style={{color:'white'}}  >{cart.length} </span>
                </NavLink> </div> </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      
      
    );
  
}
export default withRouter(NavBar);