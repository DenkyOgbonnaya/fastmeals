import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import{Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import orderApi from './order_api';
import orderHelper from './order_helper';

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
            <h3> Order List </h3>
            {orders ?  
            <div className='orders'>
                <Table responsive className='table' > 
                    <thead className='thead'> 
                        <tr> 
                            <th> Date</th>
                            <th> Reference</th>
                            <th> Meals</th>
                            <th> Total</th>
                            <th> Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            orders.map(order =>
                                <tr> 
                                    <td>{new Date(order.created).toDateString()}</td>
                                    <td>{order.payment_id || '-'}</td>
                                    <td>{order.meals.length}</td>
                                    <td>{orderHelper.getTotalPrice(order)}</td>
                                    <td>{order.status}</td>
                                    <td><img src= '/images/icons/delete_ic.png' className='delete' onClick={() => deleteOrder(order._id)} /> </td>
                                    <td> <Link to= {`/order/${order._id}`}>Details </Link> </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
            
             :
            <div> You have no ordered meals </div>
            }
        </div>

    )
}
export default OrederList;