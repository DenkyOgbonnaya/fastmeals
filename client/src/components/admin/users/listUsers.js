import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Spinner from '../../utils/spinner';

const ListUsers = () => {
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect( () => {
        fetch('api/users/admin', {
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            if(res.status === 200) return res.json();
        })
        .then(data => {
            setUsers(data.users);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, [])

    if(users.length === 0)
        return <div> There are no Customers </div>
return(
        <div> 
            {loading ? <Spinner /> : 
            <Table responsive className ='table' > 
                <thead className='thead'> 
                    <tr> 
                        <th>UserName </th>
                        <th>Email </th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map(user => 
                        <tr key= {user._id}> 
                            <td> {user.userName} </td>
                            <td> {user.email} </td>
                            <td> <Link to= {`/${user._id}/orders`}> View Orders </Link> </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            }
        </div>
        
    )
}
export default ListUsers;