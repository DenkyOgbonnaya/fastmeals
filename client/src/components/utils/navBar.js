import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink as RRNavLink} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';

const NavBar = () => {
const[isOpen, setIsOpen] = useState(false);
const[categories, setCategories] = useState([]);
const[cart] = useGlobal('cart');

useEffect(() => {
    fetch('api/categories')
    .then(res => {
        if(res.status === 200) return res.json()
    })
    .then(data => {
        setCategories(data.categories)
    })
    .catch(err => console.log(err))
}, [ ])

  const toggle = () => {
      setIsOpen(!isOpen)
  }
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <div className='text-left' ><NavbarToggler onClick={toggle} className="mr-2" />
          <NavbarBrand href="/" className="mr-auto">Fastmeals</NavbarBrand>
          </div>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {categories.map(category => 
              <NavItem key = {category.id} >
                <NavLink to = {`/${category.title}`} tag = {RRNavLink}
                 >{category.title}</NavLink>
              </NavItem>
            )}
            </Nav>
          </Collapse>
          <NavItem>
            <NavLink to = '/cart' tag= {RRNavLink}>
            <img src= 'images/icons/shopping_basket.png' alt='' /> {cart.length}
            </NavLink>
          </NavItem>
        </Navbar>
      </div>
    );
  
}
export default NavBar;