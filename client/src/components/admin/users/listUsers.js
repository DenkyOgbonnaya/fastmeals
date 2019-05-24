import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Spinner from '../../utils/spinner';
import {Alert} from 'reactstrap';

const ListUsers = () => {
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);
    const[isTokenExpired, setIsTokenExpired] = useState(false);

    useEffect( () => {
        fetch('api/users/admin', {
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.users){
            setUsers(data.users);
            setLoading(false);
            }else
            setIsTokenExpired(true)
        })
        .catch(err => console.log(err))
    }, [])

    if(users.length === 0)
        return <div>
            {isTokenExpired ? <Alert color="danger"> Expired access token! re-authenticate to see customers</Alert> : ''}
                There are no Customers
              </div>
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