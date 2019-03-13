import React,{useState} from 'react';
import {useGlobal} from 'reactn';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

const userContactForm = ({user, cart}) => {
    const[name, setName] = useState(user.userName);
    const[email, setEmail] = useState(user.email);
    const[phone, setPhone] = useState('');
    const[street, setStreet] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[showContactModal, setShowContactModal] = useGlobal('showContactModal');

    const submitForm = e => {
      e.preventDefault();
      const userToken = localStorage.userToken;

      fetch(`api/order/${user._id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          deliveryAddress: {
            street,
            city,
            state
          },
          cart
        })

      })
      .then(res => {
        if(res.status === 201)
          alert('order placed');
          setShowContactModal(!showContactModal);
      })
      .catch(err => console.log(err))
    }
    return (
        <Form onSubmit ={submitForm}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name"  placeholder="enter name" value={name}
              onChange = {e => setName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email"  placeholder="enter email" value = {email}
              onChange = {e => setEmail(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone"  placeholder="enter phone" value ={phone}
          onChange = {e => setPhone(e.target.value)} />
        </FormGroup>
        <div>Delivery Address </div>
        <FormGroup>
          <Label for="street">street</Label>
          <Input type="text" name="street"  placeholder="123 Main Street" value = {street}
          onChange = {e => setStreet(e.target.value)} />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City/Town</Label>
              <Input type="text" name="city" value = {city}
              onChange = {e => setCity(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input type="text" name="state" value = {state}
              onChange = {e => setState(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Button > Place Order </Button>
      </Form>
    )
}
export default userContactForm;