import React,{useState} from 'react';
import {useGlobal} from 'reactn';
import jwt from 'jsonwebtoken';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

const userContactForm = ({userContact, userId}) => {
    const[firstName, setFirstName] = useState(userContact.firstName);
    const[lastName, setLastName] = useState(userContact.lastName);
    const[phone, setPhone] = useState(userContact.phone);
    const[street, setStreet] = useState(userContact.street);
    const[town, setTown] = useState(userContact.town);
    const[state, setState] = useState(userContact.state);

    const[currentUser, setCurrentUser] = useGlobal('currentUser');

    const submitForm = e => {
      e.preventDefault();
      const userToken = localStorage.userToken || '';

      fetch(`api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          street,
          town,
          state
        })

      })
      .then(res => {
        if(res.status === 200)
          return res.json();
      })
      .then(data => {
        alert(data.message);
        localStorage.userToken = data.token;
        const decoded = jwt.decode(data.token)

        setCurrentUser(decoded.currentUser);
      })
      .catch(err => console.log(err))
    }
    return (
        <Form onSubmit ={submitForm}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">FirstName</Label>
              <Input type="text" name="firstName"  placeholder="enter first name" value={firstName}
              onChange = {e => setFirstName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">lastName</Label>
              <Input type="text" name="lastName"  placeholder="enter last name" value = {lastName}
              onChange = {e => setLastName(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone"  placeholder="enter phone" value ={phone}
          onChange = {e => setPhone(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="street">street</Label>
          <Input type="text" name="street"  placeholder="123 Main Street" value = {street}
          onChange = {e => setStreet(e.target.value)} />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="town">City/Town</Label>
              <Input type="text" name="town" value = {town}
              onChange = {e => setTown(e.target.value)} />
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
        <Button > Save </Button>
      </Form>
    )
}
export default userContactForm;