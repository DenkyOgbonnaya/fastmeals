import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';

const Orders = () => {
const[orders, setOrders] = useState([]);
const[currentUser] = useGlobal('currentUser');

    useEffect( () => {
        fetch(`api/order/${currentUser._id}`)
        .then(res => {
            if(res.status === 200)
                return res.json()
        })
        .then(data => {
            setOrders(data.order)
            console.log(data.order[0])
            
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div> 
            {
                orders.map(order =>
                    <div> 
                        <span>{order.order[0].meal}({order.order[0].quantity}) </span>
                    </div>
                )
                }
        </div>
    )
}
export default Orders;