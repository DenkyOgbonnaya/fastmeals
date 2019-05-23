import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {Form, Input, Button, } from 'reactstrap';
import dataProvider from './dataProvider';
import deptDataprov from '../departments/dataProvider';
import Swal from 'sweetalert2';

const CategoryForm = ({category, closeForm}) => {
    const[categories, setCategories] = useGlobal('categories');
    const[name, setName] = useState(category.name || '');
    const[departments, setDepartments] = useState([]);
    const[dept, setDept] = useState(category.department || 'food');

    useEffect( () => {
        deptDataprov.getDepartments()
        .then(data => {
            console.log(data.depts);
            setDepartments(data.depts)
        })
    }, [])
    const handleSubmit = e => {
        e.preventDefault();

        if(!category){
            setCategories(categories.concat({name, dept}))
            Swal.fire('Category', 'New category successfully added')
            dataProvider.create(name, dept)
            .then(data => setCategories(categories.concat(data.newCategory)))
            return;

        }else 
            setCategories(categories.map(categ => categ._id === category._id ? 
            Object.assign({}, categ, {name, dept}) : categ))
            Swal.fire('Category', 'Category successfully updated')
            dataProvider.editCategory(category._id, name, dept);
            closeForm();
    }
    return( 
        <div>
            <Form inline onSubmit= {handleSubmit} > 
                <Input name='name' required value = {name} onChange= {e => setName(e.target.value)} placeholder='name' /> <br />
                <Input type='select'  name='dept' required value = {dept} onChange= {e => setDept(e.target.value)}  >
                <option>Select department </option>
               {departments.map(dept => <option key={dept._id}> {dept.name} </option>)}
                </Input> <br />
                <Button color='success'> {category._id ? 'Save' : 'Add'} </Button>
            </Form>
            {category._id ? <Button color='warning' onClick = { () => closeForm()}> Cancel </Button> : null }
        </div>
    )
}
export default CategoryForm;