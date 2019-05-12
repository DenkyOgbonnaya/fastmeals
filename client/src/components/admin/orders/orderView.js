import React from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';


const OrderView = ({orders}) => {

    return (
        <Table responsive className ='table' >
        <thead>

          <tr>
            <th className ='thead'>Date</th>
            <th className ='thead'>Reference</th>
            <th className ='thead'>Customer</th>
            <th className ='thead'>No items</th>
            <th className ='thead'>Total</th>
            <th className ='thead'>returned</th>
          </tr>
        </thead>
        <tbody>
            {
                orders.map(order => 
                    <tr key= {order.reference}> 
                        <td>{order.date} </td>
                        <td>{order.reference} </td>
                        <td>{order.customer} </td>
                        <td>{order.items} </td>
                        <td>{order.total} </td>
                        <td>{order.returned} </td>
                        <td><Link to= {`/order/${order._id}` }>Edit</Link> </td>
                    </tr>
                )
            }
        </tbody>
      </Table>
    )
}

export default OrderView;