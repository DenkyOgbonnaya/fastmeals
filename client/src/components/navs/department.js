import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import '../../styles/navLinks.css';

const Department = () => {
    const[categories, setcategories] = useGlobal('categories');
    const[depts, setDepts] = useState([{_id:1, name:'food'}, {_id:2, name:'drinks'}, {_id:3, name:'fruits'},])
    
    const getCategories = id => {
        //fetch categories in department(id);
        const seedcatgories = [{id: 1, title: 'rice'}, {id: 2, title: 'Snacks'}, {id: 3, title: 'spagheti'}];
        setcategories(seedcatgories);
    }
    return(
        <div> 
            <ul className = 'navs'> 
                {
                    depts.map((dept, index) =>
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