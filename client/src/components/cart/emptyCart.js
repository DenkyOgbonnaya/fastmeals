import React from 'react';
import {Jumbotron, Button} from 'reactstrap';

const EmptyCart = ({history}) => {
    return( 
        <Jumbotron className ='empty'>
            Your shopping Cart is empty! 
            <br />
            <Button onClick= {() => history.push("/")} color='success'> Start Shopping </Button>
        </Jumbotron>
    )
}

export default EmptyCart;