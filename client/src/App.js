import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import NavBar from './components/utils/navBar';
import Container from './components/container';
import NavLinks from './components/utils/navLinks';
import SideNav from './components/utils/sideNav';
import jwt from 'jsonwebtoken';
import './App.css';

const App = () => {
    const[showSideNav, setShowSideNav] = useGlobal('showSideNav');
    const[currentUser, setCurrentUser] = useGlobal('currentUser');
    const[cart, setCart] = useGlobal('cart');

    useEffect( () => {
        const cartId = localStorage.cartId || '';
        const userToken = localStorage.userToken || '';

        if(userToken){
            const decoded = jwt.decode(userToken);
            setCurrentUser(decoded.currentUser);
        }
        if(!cartId)
            fetch('api/cart')
            .then(res => {
                if(res.status === 200)
                    return res.json();
            })
            .then(data => localStorage.cartId = data.cartId)
            .catch(err => console.log(err))

        if(cartId){
            fetch(`cart/${cartId}`)
            .then(res => {
                if(res.status === 200)
                    return res.json();
            })
            .then(data => {
                setCart(data.cart)
            })
            .catch(err => console.log(err))
        }
    })
    
    return(
        <div className= 'App' >
            <div className = 'NavBar' >
            <NavBar />
            </div>
            <hr />
            <div className='NavLinks' >
            <NavLinks />
            </div>
            <hr />
            <div className='Wrapper' > 
                <div className= {showSideNav ? 'showSideNav' : 'hideSideNav'} onClick= {() => setShowSideNav(false)} > 
                    <SideNav />
                </div>
                <div className= 'Content'> 
                    <Container />
                </div>
            </div>
        </div>
    )
}
export default App;