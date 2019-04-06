import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import{Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import orderApi from './order_api';
import '../../styles/profile.css';

const OrederList = () => {
    const[orders, setOrders] = useState([]);
    const[user] = useGlobal('currentUser');

    useEffect( () => {
        orderApi.getOrders(user._id)
        .then(orders => setOrders(orders))
    }, []);
    const deleteOrder = id => {
        setOrders(orders.filter(order => order._id !== id));
        orderApi.deleteOrder(id);
    }
    return(
        <div> 
            <h3> Profile </h3>
            <Table> 
                <tbody> 
                    <tr> 
                        <td>Name </td>
                        <td>{user.userName} </td>
                    </tr>
                    <tr> 
                        <td>Email </td>
                        <td>{user.email} </td>
                    </tr>
                </tbody>
            </Table>
            <h3> Your Orders </h3>
            {orders ?  
            <div className='orders'>
            {orders.map(order => 
            <div key= {order._id}>#:  
            <Link to = {`/order/${order._id}`} style={{color: 'grey'}}> {order._id} </Link> 
            <img className= "delete" src = "/images/icons/delete_ic.png" alt="edit" 
            onClick = {() => deleteOrder(order._id)} /> <br />
            </div>
            )}
            </div> :
            <div> You have no ordered meals </div>
            }
        </div>

    )
}
export default OrederList;