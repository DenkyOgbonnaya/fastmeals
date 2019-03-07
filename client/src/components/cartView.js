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
  const removeFromCart = (mealId, cartId) =>{
      fetch(`api/cart/${cartId}/${mealId}`, {
          method: 'DELETE'
      })
      .then(res => {
          if(res.status === 200)
                alert('meal removed')
      })
      .catch(err => console.log(err))
  }
  const CheckOutOrder = cart => {
        if(currentUser && currentUser.contact != null) {
          setShowContactModal(true);
        }else
        if(currentUser && currentUser.contact === null){
            setShowAddContact(true)
        } else
        props.history.push('/login')
    }
    return (
    <div>
        {
            showContactModal ? <ContactModal cart = {cart}/> : ''
        }
        {
            showAddContact ? <AddContact cart = {cart} />  : ''
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
                cart.map(meal =>
                    <tr key = {meal._id}> 
                        <td><img src= {meal.image} alt='meal' height= '80px' width= '80px'/> {meal.name} </td>
                        <td>{meal.price}</td>
                        <td>{meal.quantity}</td>
                        <td>{meal.subTotal}</td>
                        <td>
                        <ButtonGroup>
                            <Button>+</Button> 
                            <Button onClick= { () => removeFromCart(meal.mealId, localStorage.cartId)} >Remove</Button> 
                            <Button>-</Button>
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