import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import ContactModal from './utils/contactModal';
import { Table, Button, ButtonGroup} from 'reactstrap';
import '../styles/cart.css';

const Cart = (props) => {
  const[cart, setCart] = useGlobal('cart');
  const[currentUser] = useGlobal('currentUser');
  const[showContactModal, setShowContactModal] = useGlobal('showContactModal');

  useEffect( () => {
      const cartId = localStorage.cartId;
      fetch(`cart/${cartId}`)
      .then(res => {
          if(res.status === 200)
            return res.json();
      })
      .then(data => {
          setCart(data.cart)
      })
      .catch(err => console.log(err))
  }, []);
  const getTotalPrice = () => {
      const totalPrice = cart.map(meal => meal.subTotal).reduce( (acc, val) =>  acc + val, 0 )
      return totalPrice;
  }
  const removeFromCart = (mealId, index) =>{
      const cartId = localStorage.cartId;
      fetch(`api/cart/${cartId}/${mealId}`, {
          method: 'DELETE'
      })
      .then(res => {
          if(res.status === 200){
            const cartCopy = Object.assign([], cart);
            cartCopy.splice(index, 1);
            setCart(cartCopy);
          }
            
      })
      .catch(err => console.log(err))
  }
  const CheckOutOrder = cart => {
        if(currentUser) {
          setShowContactModal(true);
        } else
        props.history.push('/login')
    }

    const updateQuantity = (mealIndex, meal, action) => {
        const cartId = localStorage.cartId;
        action === 'inc' ? meal.quantity++ : meal.quantity--

        fetch(`api/cart/${cartId}/${meal.mealId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-TYpe': 'application/json'
            },
            body: JSON.stringify({quantity: meal.quantity})
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
           const cartCopy = Object.assign([], cart);
           cartCopy[mealIndex] = data.meal;
           setCart(cartCopy);
        })
        .catch(err => console.log(err))
    }

    if(cart.length === 0)
        return <div className ='empty'> Your shopping Cart is empty! </div>
    return (
    <div>
        {
            showContactModal ? <ContactModal cart = {cart}/> : ''
        }
      <Table responsive className ='table' >
        <thead>

          <tr>
            <th className ='thead'>Meal</th>
            <th className ='thead'>Unit Price</th>
            <th className ='thead'>Quantity</th>
            <th className ='thead'>SubTotal</th>
            <th className ='thead'>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                cart.map((meal, index) =>
                    <tr key = {meal._id}> 
                        <td><img src= {meal.image} alt='meal' height= '80px' width= '80px'/> {meal.name} </td>
                        <td>{meal.price}</td>
                        <td>{meal.quantity}</td>
                        <td>{meal.subTotal}</td>
                        <td>
                        <ButtonGroup className = "btnGrp">
                            <Button onClick = {() =>  updateQuantity(index, meal, 'inc') } className = 'actions'>+</Button> 
                            <Button onClick= { () => removeFromCart(meal.mealId, index)} className = 'actions' >Remove</Button> 
                            <Button onClick = {() => { if(meal.quantity >=2 )updateQuantity(index, meal, 'dec') } } className = 'actions'>-</Button>
                        </ButtonGroup></td>
                    </tr> 
                )
            }
        </tbody>
      </Table>
      <div>Total: N{getTotalPrice()}   </div>
      <Button onClick = { () => CheckOutOrder(cart) } className = 'checkout'> CheckOut </Button> {' '}
      <Button onClick ={() => props.history.push('/')} className = 'continue'> Continue shopping </Button>
      </div>
    );
  }
  export default Cart;