import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import {Link} from 'react-router-dom';
import { Button, FormGroup, Form, Input } from 'reactstrap';
import jwt from 'jsonwebtoken';
import '../../styles/authForm.css';


const SignupForm = (props) => {
    const[userName, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[error, setError] = useState('');
    const[password, setPassword] = useState('');
    const[currentUser, setCurrentUser] = useGlobal('currentUser');

    const handleSubmit = e => {
        e.preventDefault();

        fetch('api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                email,
                password
            })
        })
        .then(res => {
            if(res.status === 201)
                return res.json();
            res.json().then(data => setError(data.message) )
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
        <div className = 'authForm'>
            <div className = 'form'>
            <h5> Sign up to Fastmeals </h5>
            <div id= 'error' > {error} </div>
                <Form onSubmit = {handleSubmit} >
                    <FormGroup>
                        <label for ='userName'>User Name </label> 
                        <Input name='userName' required placeholder = 'Enter userName' onChange={e => setUserName(e.target.value)} /> 
                    </FormGroup>
                    <FormGroup>
                        <label for ='email'> Email </label>
                        <Input name='email' required type='email' placeholder = 'Enter email' onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <label for ='password'> Password </label>
                        <Input type = 'password' required name='password' placeholder = 'Enter password' onChange={e => setPassword(e.target.value)} />
                    </FormGroup >
                    <Button> Signup </Button> {" "} <Link to= '/login'> Already have an account? </Link>
                </Form>
                <div id = 'google'>
                        OR 
                        <br />
                        Sign Up with Google 
                        <br />
                        <img src= '/images/icons/google.png' onClick = { () => window.location.href = 'http://localhost:8080/auth/google'} alt= 'google login'  />
                        </div>
            </div>
    
      </div>
        
    )
}

export default SignupForm;