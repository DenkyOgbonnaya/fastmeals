import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';

const ListUsers = () => {
    const[users, setUsers] = useState([]);

    useEffect( () => {
        fetch('api/users/', {
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            if(res.status === 200) return res.json();
        })
        .then(data => setUsers(data.users))
        .catch(err => console.log(err))
    }, [])

return(
    <div> 
        <Table responsive className ='table' > 
            <thead className='thead'> 
                <tr> 
                    <th>UserName </th>
                    <th>Email </th>
                </tr>
            </thead>
            {
                users.map(user => 
                    <tr key= {user._id}> 
                        <td> {user.userName} </td>
                        <td> {user.email} </td>
                        <td> <Link to= {`/${user._id}/orders`}> View Orders </Link> </td>
                    </tr>
                )
            }
        </Table>
    </div>
)
}
export default ListUsers;