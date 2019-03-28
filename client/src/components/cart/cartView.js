import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import ContactForm from '../order/contactForm';
import { Table, Button, ButtonGroup} from 'reactstrap';
import cartApi from './cart_api';
import cartHelper from './cart_helper';
import '../../styles/cart.css';

const Cart = (props) => {
  const[cart, setCart] = useGlobal('cart');
  const[currentUser] = useGlobal('currentUser');
  const[showContactModal, setShowContactModal] = useGlobal('showContactModal');

  useEffect( () => {
      cartApi.getCart()
      .then(cart => setCart(cart));
  }, []);
  
  const removeFromCart = (mealId) =>{
      const cartId = localStorage.cartId;
      setCart(cart.filter(meal => meal.mealId !== mealId ));
      cartApi.removeMeal(mealId, cartId);

  }
  const CheckOutOrder = cart => {
        if(currentUser) {
          setShowContactModal(true);
        } else
        props.history.push('/login')
    }

    const updateQuantity = (mealIndex, meal, action) => {
        if(action === 'inc'){
            const updatedCart = cartHelper.increaseQuantity(meal.mealId, cart)
            setCart(updatedCart);
            const quantity = updatedCart[mealIndex].quantity
            cartApi.updateQuantity(quantity, meal.mealId)
            
        }else{
            const updatedCart = cartHelper.decreaseQuantity(meal.mealId, cart)
            setCart(updatedCart);
            const quantity = updatedCart[mealIndex].quantity
            cartApi.updateQuantity(quantity, meal.mealId)
        }
         
        
    }

    if(cart.length === 0)
        return <div className ='empty'> Your shopping Cart is empty! </div>
    return (
    <div>
        {
            showContactModal ? <ContactForm cart = {cart} user = {currentUser}/> : ''
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
                        <td>{meal.price*meal.quantity}</td>
                        <td>
                        <ButtonGroup className = "btnGrp">
                            <Button onClick = {() =>  updateQuantity(index, meal, 'inc') } className = 'actions'>+</Button> 
                            <Button onClick= { () => removeFromCart(meal.mealId)} className = 'actions' >Remove</Button> 
                            <Button onClick = {() => { if(meal.quantity >=2 )updateQuantity(index, meal, 'dec') } } className = 'actions'>-</Button>
                        </ButtonGroup></td>
                    </tr> 
                )
            }
        </tbody>
      </Table>
      <div>Total: N{cartHelper.getTotalPrice(cart)}   </div>
      <Button onClick = { () => CheckOutOrder(cart) } className = 'checkout'> CheckOut </Button> {' '}
      <Button onClick ={() => props.history.push('/')} className = 'continue'> Continue shopping </Button>
      </div>
    );
  }
  export default Cart;