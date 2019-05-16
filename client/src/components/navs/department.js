import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css';
import dataProvider from '../admin/departments/dataProvider';

const Department = () => {
    const[categories, setcategories] = useGlobal('categories');
    const[depts, setDepts] = useState([]);
    
    useEffect( () => {
        dataProvider.getDepartments()
        .then(data => setDepts(data.depts))
    }, [])
    const getCategories = id => {
        //fetch categories in department(id);
        const seedcatgories = [{id: 1, title: 'rice'}, {id: 2, title: 'Snacks'}, {id: 3, title: 'spagheti'}];
        setcategories(seedcatgories);
    }
    return(
        <div> 
            <ul className = 'navs'> 
                {
                    depts.map((dept) =>
                        <li key = {dept._id}>
                        <NavLink to={`/`} className = 'deptlinks' tag={RRNavLink} onClick= {() => getCategories(dept._id)} >
                        {dept.name} </NavLink> </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Department;