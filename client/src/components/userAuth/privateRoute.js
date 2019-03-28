import React from 'react';
import {useGlobal} from 'reactn';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const[user] = useGlobal('currentUser');
    return(
        <Route {...rest} render = {(props) => (
            user.hasOwnProperty('email') ? <Component {...props} /> : <Redirect to = {{
                pathname: '/login',
                state: {from: props.location}
            }} />
        )} />
    )
}

export default PrivateRoute;