import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css';
import dataProvider from '../admin/departments/dataProvider';
import categDataprov from '../admin/categories/dataProvider';

const Department = () => {
    const[categories, setCategories] = useGlobal('categories');
    const[depts, setDepts] = useState([]);
    
    useEffect( () => {
        dataProvider.getDepartments()
        .then(data => setDepts(data.depts))
    }, [])
    const getCategories = name => {
        //fetch categories in department(name);
        categDataprov.getCategoriesInDept(name)
        .then(data => setCategories(data.categories))

    }
    return(
        <div> 
            <ul className = 'navs'> 
                {
                    depts.map((dept) =>
                        <li key = {dept._id}>
                        <NavLink to={`/`} className = 'deptlinks'  tag={RRNavLink} onClick= {() => getCategories(dept.name)} >
                        {dept.name} </NavLink> </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Department;