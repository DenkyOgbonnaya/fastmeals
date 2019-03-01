import React, {useState} from 'react';
import {Form, Input, Button} from 'reactstrap';
import {useGlobal} from 'reactn';
import jwt from 'jsonwebtoken';

const LoginForm = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[currentUser, setCurrentUser] = useGlobal('currentUser');

    const onInputChange = e => {
        const value = e.target.value;
        e.target.name === 'email' ? setEmail(value) : setPassword(value)
     }
    const handleSubmit = e => {
        e.preventDefault();

        fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            localStorage.userToken = data.token;
            const decoded = jwt.decode(data.token);
            setCurrentUser(decoded.currentUser);

            props.history.push('/');
        })
        .catch(err => console.log(err))
    }
    return(
        <Form onSubmit = {handleSubmit} > 
            <Input name='email' placeholder = 'Enter email' onChange={onInputChange} />
            <Input type = 'password' name='password' placeholder = 'Enter password' onChange={onInputChange} />
            <Button> login </Button>
        </Form>
    )
}

export default LoginForm;