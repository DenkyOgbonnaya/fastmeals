import React from 'react';
import {Table } from 'reactstrap';
import Department from './department';

const ListDepartments = ({depts}) => {
    return(
        <div> 
            <h5> Existing </h5>
            {depts.length > 0 ?
            <Table> 
                <thead className='thead'> 
                    <tr> 
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody> 
                    {depts.map(department =>
                        <Department dept = {department} /> 
                    )}
                </tbody>
            </Table>
            : <div> No existing departments </div>
            }
        </div>
    )
}

export default ListDepartments;