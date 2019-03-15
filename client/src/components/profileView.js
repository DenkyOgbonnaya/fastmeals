import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import{Table} from 'reactstrap';
import {Link} from 'react-router-dom';

const Profile = () => {
    const[orders, setOrders] = useState([]);
    const[user] = useGlobal('currentUser');

    useEffect( () => {
        fetch(`/api/${user._id}/order`)
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            setOrders(data.orders)
        })
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
            <div>
            {orders.map(order => 
            <div key= {order._id}> Order: 
            <Link to = {`/order/${order._id}`}> {order._id} </Link> <br />
            </div>
            )}
            </div>
        </div>

    )
}
export default Profile;