import React from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';

const users = [
    {_id:'kejkdj', name: 'Alex', email:'Alex@fastmeals.com', orders: '5'},
    {_id:'kfhkdj', name: 'James', email:'James@fastmeals.com', orders: '3'},
    {_id:'kdkdj', name: 'Mary', email:'Mary@fastmeals.com', orders: '10'}
]
const ListUsers = () => {

return(
    <div> 
        <Table responsive className ='table' > 
            <thead className='thead'> 
                <tr> 
                    <th>Name </th>
                    <th>Email </th>
                    <th>Orders </th>
                </tr>
            </thead>
            {
                users.map(user => 
                    <tr key= {user._id}> 
                        <td> {user.name} </td>
                        <td> {user.email} </td>
                        <td> {user.orders} </td>
                        <td> <Link to= {`/order`}> View Orders </Link> </td>
                    </tr>
                )
            }
        </Table>
    </div>
)
}
export default ListUsers;