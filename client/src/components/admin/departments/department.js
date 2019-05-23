import React, {useState} from 'react';
import DeptForm from './deptForm';
import {Button} from 'reactstrap';

const Department = ({dept}) => {
    const[editformOPen, setEditFormOpen] = useState(false);

    const closeForm = () => {
        setEditFormOpen(false);
    }

    if(editformOPen)
        return (
            <tr key= {dept._id}>
                <td key= {dept._id}> 
                    <DeptForm dept = {dept} closeForm = {closeForm} />
                </td>
            </tr>
        )
    return(
        <tr key= {dept._id}>
            <td>{dept.name} </td>
            <td>{dept.description} </td>
            <td><Button onClick ={() => setEditFormOpen(true)} outline color='success'> edit </Button></td>
        </tr>
    )
}
export default Department;