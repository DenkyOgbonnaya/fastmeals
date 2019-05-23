import React from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import orderHelper from '../../order/order_helper';
import formatter from '../../utils/formatter';


const OrderView = ({orders}) => {

    if(orders.length <= 0){
        return <div> There are no orders here </div>
    }else
    return (
        <Table responsive className ='table' >
        <thead>

          <tr>
            <th className ='thead'>Date ordered</th>
            <th className ='thead'>Reference</th>
            <th className ='thead'>Customer</th>
            <th className ='thead'>Meals</th>
            <th className ='thead'>Total</th>
          </tr>
        </thead>
        <tbody>
            {
                orders.map(order => 
                    <tr key= {order._id}> 
                        <td>{new Date(order.created).toDateString()} </td>
                        <td>{order.payment_id || '-'} </td>
                        <td>{order.customerName} </td>
                        <td>{order.meals.length} </td>
                        <td>{formatter.format( orderHelper.getTotalPrice(order) )} </td>
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