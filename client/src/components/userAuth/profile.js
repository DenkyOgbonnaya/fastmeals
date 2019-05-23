import React from 'react';
import {useGlobal} from 'reactn';
import {Table} from 'reactstrap';

const profile = () => {
    const[currentUser] = useGlobal('currentUser');

    return(
        <div>
            <h5> Profile </h5>
            <Table> 
                <tbody> 
                    <tr> 
                        <td>Username </td>
                        <td>{currentUser.userName} </td>
                    </tr>
                    <tr> 
                        <td>Email </td>
                        <td>{currentUser.email} </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default profile;