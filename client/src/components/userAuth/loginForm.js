import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input,
Container, Row, Col } from 'reactstrap';
import jwt from 'jsonwebtoken';

const LoginForm = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[isModalOPen, setIsModalOpen] = useState(true)
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

            setIsModalOpen(!isModalOPen);
            props.history.push(from);
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
        <Modal isOpen={isModalOPen} >
          <ModalHeader toggle = {() => setIsModalOpen(!isModalOPen)} >Login</ModalHeader>
          <ModalBody>
            <div className= 'errorMessage' style = {{color: 'red'}}> {error} </div>
            <Form onSubmit = {handleSubmit} > 
                <Input name='email' placeholder = 'Enter email' onChange={e => setEmail(e.target.value)} />
                <Input type = 'password' name='password' placeholder = 'Enter password' 
                onChange={e => setPassword(e.target.value)} />
                <br />
                <Button> login </Button> 
            </Form>
    
          </ModalBody>
        </Modal>
      </div>
        
    )
}

export default LoginForm;