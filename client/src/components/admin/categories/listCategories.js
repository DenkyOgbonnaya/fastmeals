import React from 'react';
import {Table } from 'reactstrap';
import Category from './category';

const ListCategories = ({categories}) => {
    return(
        <div> 
            <h5> Existing </h5>
            {categories.length > 0 ?
            <Table> 
                <thead className='thead'> 
                    <tr> 
                        <th>Name</th>
                        <th>department</th>
                    </tr>
                </thead>
                <tbody> 
                    {categories.reverse().map(categ =>
                        <Category category = {categ} /> 
                    )}
                </tbody>
            </Table>
            : <div> No existing categories </div>
            }
        </div>
    )
}

export default ListCategories;