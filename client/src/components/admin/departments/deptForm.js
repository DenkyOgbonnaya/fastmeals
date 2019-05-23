import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {Form, Input, Button, } from 'reactstrap';
import dataProvider from './dataProvider';
import Swal from 'sweetalert2';

const DeptForm = ({dept, closeForm}) => {
    const[departments, setDepartments] = useGlobal('departments');
    const[name, setName] = useState(dept.name || '');
    const[description, setDescription] = useState(dept.description || '');

    const handleSubmit = e => {
        e.preventDefault();

        if(!dept){
            setDepartments(departments.concat({name, description}));
            Swal.fire('Department', 'New department successfully added');
            dataProvider.create(name, description)
            .then(data => setDepartments(departments.concat(data.newDept)))

        }else
            setDepartments(departments.map(department => department._id === dept._id ? 
            Object.assign({}, department, {name, description}) : department))
            Swal.fire('Department', 'Department successfully updated')
            dataProvider.editDepartment(dept._id, name, description);
            closeForm();
    }
    return( 
        <div>
            <Form inline onSubmit= {handleSubmit} > 
                <Input name='name' value = {name} required onChange= {e => setName(e.target.value)} placeholder='name' /> <br />
                <Input type='textarea' required name='description' value = {description} onChange= {e => setDescription(e.target.value)} placeholder='description' /> <br />
                <Button color='success'> {dept._id ? 'Save' : 'Add'} </Button>
            </Form>
            {dept._id ? <Button color='warning' onClick = { () => closeForm()}> Cancel </Button> : null }
        </div>
    )
}
export default DeptForm;