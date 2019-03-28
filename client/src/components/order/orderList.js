import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import{Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import orderApi from './order_api';
import '../../styles/profile.css';

const Profile = () => {
    const[orders, setOrders] = useState([]);
    const[user] = useGlobal('currentUser');

    useEffect( () => {
        orderApi.getOrders(user._id)
        .then(orders => setOrders(orders))
    }, []);
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
            <div className='orders'>
            {orders.map(order => 
            <div key= {order._id}>#:  
            <Link to = {`/order/${order._id}`} style={{color: 'grey'}}> {order._id} </Link> <br />
            </div>
            )}
            </div>
        </div>

    )
}
export default Profile;