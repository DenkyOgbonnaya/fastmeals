import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import jwt from 'jsonwebtoken';

const SignupForm = (props) => {
    const[userName, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[error, setError] = useState('');
    const[password, setPassword] = useState('');
    const[isModalOPen, setIsModalOpen] = useState(true)
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

            setIsModalOpen(!isModalOPen);
            props.history.push('/');
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
        <Modal isOpen={isModalOPen} >
          <ModalHeader toggle = {() => setIsModalOpen(!isModalOPen)} >Create Account</ModalHeader>
          <ModalBody>
            <div> {error} </div>
            <Form onSubmit = {handleSubmit} > 
                <Input name='userName' placeholder = 'Enter userName' onChange={e => setUserName(e.target.value)} /> 
                <Input name='email' type='email' placeholder = 'Enter email' onChange={e => setEmail(e.target.value)} />
                <Input type = 'password' name='password' placeholder = 'Enter password' onChange={e => setPassword(e.target.value)} />
                <br />
                <Button> Signup </Button> 
            </Form>
    
          </ModalBody>
        </Modal>
      </div>
        
    )
}

export default SignupForm;