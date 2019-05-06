import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ManageMeals from './manageMeals';
import Index from './index';

const Content = () => {
    return(
        <div> 
            <Switch> 
                <Route to = '/admin/' component = {Index} />
                <Route to = '/admin/managemeals' component = {ManageMeals} />
            </Switch>
        </div>
    )
}

export default Content;