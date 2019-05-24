import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useGlobal} from 'reactn';
import { Button, FormGroup ,Form, Label, Input } from 'reactstrap';
import jwt from 'jsonwebtoken';
import '../../styles/authForm.css';

const LoginForm = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[currentUser, setCurrentUser] = useGlobal('currentUser');

    const handleSubmit = e => {
        e.preventDefault();
        const {from} = props.location.state || {from : {pathName: '/' }}

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
            res.json().then(data => setError(data.message) )
        })
        .then(data => {
            localStorage.userToken = data.token;
            const decoded = jwt.decode(data.token);
            setCurrentUser(decoded.currentUser);
            props.history.push(from.pathname || from.pathName);
        })
        .catch(err => console.log(err))
    }
   
    return(
        <div className = 'authForm'>
            
                <div className = 'form'>
                    <h5>Login to Fastmeals </h5> <br />
                    <div id= 'error' > {error} </div>
                    <Form onSubmit = {handleSubmit}  > 
                        <FormGroup>
                            <Label for= 'email'> Email </Label>
                            <Input name='email' required placeholder = 'Enter email' onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for ='password'>Password </Label>
                            <Input type = 'password' required name='password' placeholder = 'Enter password' 
                            onChange={e => setPassword(e.target.value)} />
                        </FormGroup> <br />
                        <Button> login </Button> {" "} <Link to= '/signup'> Don't have an account? </Link> <br />
                        <div id = 'google'>
                        OR 
                        <br />
                        Login with Google 
                        <br />
                        <img src= '/images/icons/google.png' onClick = { () => window.location.href = 'http://localhost:8080/auth/google'} alt= 'google login'  />
                        </div>
            
                    </Form>
                </div>
        </div>
        
    )
}

export default LoginForm;