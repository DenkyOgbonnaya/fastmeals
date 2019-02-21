import React, {useEffect} from 'react';
import NavBar from './components/utils/navBar';
import Container from './components/container';

const App = () => {
    useEffect( () => {
        const cartId = localStorage.cartId || '';
        if(!cartId)
            fetch('api/cart')
            .then(res => {
                if(res.status === 200)
                    return res.json();
            })
            .then(data => localStorage.cartId = data.cartId)
            .catch(err => console.log(err))
    })
    

    return(
        <div>
            <NavBar />
            <hr />
            <Container />
        </div>
    )
}
export default App;