import React, {useState, useEffect} from 'react';
import {Form, Input, Table, Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import dataProvider from './dataProvider';

const ListDepartments = () => {
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[departments, setDepartments] = useState([]);

    useEffect( () => {
        dataProvider.getDepartments()
        .then(data => setDepartments(data.depts))
    }, [])
    const handleSubmit = e => {
        e.preventDefault();

        setDepartments(departments.concat({name, description}));
        dataProvider.create(name, description)
        .then(data => setDepartments(departments.concat(data.newDept)))

    }

    return(
        <div> 
            <br />
            <h5> New Department </h5>
            <Form inline onSubmit= {handleSubmit} > 
                <Input name='name' value = {name} onChange= {e => setName(e.target.value)} placeholder='name' /> {' '}
                <Input type='textarea' name='description' value = {description} onChange= {e => setDescription(e.target.value)} placeholder='description' /> {' '}
                <Button color='success'>Add </Button>
            </Form>
            <br />
            <h5> Existing </h5>
            {departments.length > 0 ?
            <Table> 
                <thead className='thead'> 
                    <tr> 
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody> 
                    {departments.map(department =>
                        <tr key = {department._id}> 
                            <td>{department.name} </td>
                            <td>{department.description} </td>
                            <td><Button outline color='success'> edit </Button></td>
                        </tr> 
                    )}
                </tbody>
            </Table>
            : <div> No exiting departments </div>
            }
        </div>
    )
}

export default ListDepartments;