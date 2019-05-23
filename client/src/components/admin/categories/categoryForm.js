import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {Form, Input, Button, } from 'reactstrap';
import dataProvider from './dataProvider';
import Swal from 'sweetalert2';

const CategoryForm = ({category, closeForm}) => {
    const[categories, setCategories] = useGlobal('categories');
    const[name, setName] = useState(category.name || '');
    const[department, setDepartment] = useState(category.department || '');

    const handleSubmit = e => {
        e.preventDefault();

        if(!category){
            setCategories(categories.concat({name, department}))
            Swal.fire('Category', 'New category successfully added')
            dataProvider.create(name, department)
            .then(data => setCategories(categories.concat(data.newCategory)))
            return;

        }else 
            setCategories(categories.map(categ => categ._id === category._id ? 
            Object.assign({}, categ, {name, department}) : categ))
            Swal.fire('Category', 'Category successfully updated')
            dataProvider.editCategory(category._id, name, department);
            closeForm();
    }
    return( 
        <div>
            <Form inline onSubmit= {handleSubmit} > 
                <Input name='name' required value = {name} onChange= {e => setName(e.target.value)} placeholder='name' /> <br />
                <Input  name='department' required value = {department} onChange= {e => setDepartment(e.target.value)} placeholder='department' /> <br />
                <Button color='success'> {category._id ? 'Save' : 'Add'} </Button>
            </Form>
            {category._id ? <Button color='warning' onClick = { () => closeForm()}> Cancel </Button> : null }
        </div>
    )
}
export default CategoryForm;