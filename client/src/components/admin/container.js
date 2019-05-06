import React from 'react';
import SideNav from './sideNav';
import Content from './content';

const AdminDashboard = () => {
    return(
        <div className= 'Wrapper'> 
            <div className= 'SideNav'> 
                <SideNav />
            </div>
            <div className = 'Content'> 
                <Content />
            </div>
        </div>
    )
}

export default AdminDashboard;