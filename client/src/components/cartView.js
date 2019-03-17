import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import ContactModal from './utils/contactModal';
import AddContact from './utils/addContact';
import { Table, Button, ButtonGroup} from 'reactstrap';

const Cart = (props) => {
  const[cart, setCart] = useGlobal('cart');
  const[currentUser] = useGlobal('currentUser');
  const[showContactModal, setShowContactModal] = useGlobal('showContactModal');
  const[showAddContact, setShowAddContact] = useGlobal('showAddContact');

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
          if(res.status === 200)
                cart.splice(index, 1);
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
         console.log(meal.quantity)
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
            cart[mealIndex] = data.meal;
        })
        .catch(err => console.log(err))
    }

    if(cart.length === 0)
        return <div> Your shopping Cart is empty </div>
    return (
    <div>
        {
            showContactModal ? <ContactModal cart = {cart}/> : ''
        }
      <Table responsive >
        <thead>

          <tr>
            <th>Meal</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>SubTotal</th>
            <th>Actions</th>
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
                        <ButtonGroup>
                            <Button onClick = {() =>  updateQuantity(index, meal, 'inc') }>+</Button> 
                            <Button onClick= { () => removeFromCart(meal.mealId, index)} >Remove</Button> 
                            <Button onClick = {() => { if(meal.quantity >=2 )updateQuantity(index, meal, 'dec') } } >-</Button>
                        </ButtonGroup></td>
                    </tr> 
                )
            }
        </tbody>
      </Table>
      <div>Total: N{getTotalPrice()}   </div>
      <Button onClick = { () => CheckOutOrder(cart) } > CheckOut </Button>
      </div>
    );
  }
  export default Cart;