import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input,
Container, Row, Col } from 'reactstrap';
import jwt from 'jsonwebtoken';

const LoginForm = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isModalOPen, setIsModalOpen] = useState(true)
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

            setIsModalOpen(!isModalOPen);
            props.history.push('/');
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
        <Modal isOpen={isModalOPen} >
          <ModalHeader >Login</ModalHeader>
          <ModalBody>
            <Form onSubmit = {handleSubmit} > 
                <Input name='email' placeholder = 'Enter email' onChange={onInputChange} />
                <Input type = 'password' name='password' placeholder = 'Enter password' onChange={onInputChange} />
                <br />
                <Button> login </Button> 
            </Form>
    
          </ModalBody>
        </Modal>
      </div>
        
    )
}

export default LoginForm;