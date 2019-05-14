import React from 'react';
import {Form, Input, Table, Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const categories = [
    {name: 'rice', department: 'food'}, {name: 'bear', department: 'drinks'}
]
const ListCategories = () => {

    return(
        <div> 
            <br />
            <h5> New category </h5>
            <Form inline> 
                <Input name='name' placeholder='name' />
                <Input name='department' placeholder='department' />
                <Button>Add </Button>
            </Form>
            <br />
            <h5> Existing </h5>
            <Table> 
                <thead className='thead'> 
                    <tr> 
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody> 
                    {categories.map(category =>
                        <tr> 
                            <td>{category.name} </td>
                            <td>{category.department} </td>
                            <td><Button> edit </Button></td>
                        </tr> 
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ListCategories;