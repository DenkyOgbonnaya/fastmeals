import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import DeptForm from './deptForm';
import ListDepartments from './listDepartments';
import dataProvider from './dataProvider';

const DeptDashboard = () => {
    const[departments, setDepartments] = useGlobal('departments');

    useEffect( () => {
        dataProvider.getDepartments()
        .then(data => setDepartments(data.depts))
    }, [])
    return (
        <div>
            <h5> New Department </h5> 
            <DeptForm dept = '' />
            <ListDepartments depts  = {departments} />
        </div>
    )
}

export default DeptDashboard;