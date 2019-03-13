import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';

const Orders = (props) => {
const[orders, setOrders] = useState([]);
const[currentUser] = useGlobal('currentUser');

    useEffect( () => {
        const  orderId = props.match.params.orderId
        fetch(`api/order/${orderId}`)
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
    const renderOrders = () => {
        for(let order of orders){
            console.log('this',order.order)
            order.order.map(meal =>
                <div>{meal.meal} price: {order.totalPrice}</div>
            )
        }
    }

    return(
        <div> 
            {
                
                renderOrders()
                }
        </div>
    )
}
export default Orders;