import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import NavBar from './components/navs/navBar';
import Container from './components/container';
import NavLinks from './components/navs/navLinks';
import SideNav from './components/navs/sideNav';
import jwt from 'jsonwebtoken';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import SearchMeal from './components/meals/searchMeal';
import './App.css';
import Footer from './components/footer';

const App = props => {
    const[showSideNav, setShowSideNav] = useGlobal('showSideNav');
    const[currentUser, setCurrentUser] = useGlobal('currentUser');
    const[cart, setCart] = useGlobal('cart');

    useEffect( () => {
        const query = queryString.parse(props.location.search);

        if(query.token){
            localStorage.userToken = query.token;
        }
    })

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
    }, [] )
    
    return(
        <div className= 'App' >
            <div className='Wrapper' > 
                <div className= {showSideNav ? 'showSideNav' : 'hideSideNav'} onClick= {() => setShowSideNav(false)} > 
                    <SideNav />
                </div>
                    <div className= 'Content'> 
                        <div className = 'NavBar' >
                            <NavBar />
                        </div >
                        <div className = 'Container'>
                            <Container />
                        </div>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    )
}
export default withRouter(App);