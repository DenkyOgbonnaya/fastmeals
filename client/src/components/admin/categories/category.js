import React, {useState} from 'react';
import CategoryForm from './categoryForm';
import {Button} from 'reactstrap';

const Category = ({category}) => {
    const[editformOPen, setEditFormOpen] = useState(false);

    const closeForm = () => {
        setEditFormOpen(false);
    }

    if(editformOPen)
        return (
            <tr key= {category._id}> 
                <td key= {category._id}> 
                    <CategoryForm category = {category} closeForm = {closeForm} />
                </td>
            </tr>
        )
    return(
        <tr key = {category._id}> 
            <td>{category.name} </td>
            <td>{category.department} </td>
            <td><Button onClick ={() => setEditFormOpen(true)} outline color='success'> edit </Button></td>
        </tr>
    )
}
export default Category;