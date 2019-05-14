import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {Container, Row, Col, Table, Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Form, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import orderApi from './order_api';
import orderHelper from './order_helper';
import '../../styles/order.css';
import formatter from '../utils/formatter';
import Can from '../utils/can';

const Order = (props) => {
const[order, setOrder] = useState({deliveryAddress: {}, meals: [] });
const[status, setStatus] = useState('');
const[currentUser] = useGlobal('currentUser');

useEffect( () => {
    orderApi.getOrder(props.match.params.orderId)
    .then(order => setOrder(order))
}, []);

const handleStatusChange = e => {
    e.preventDefault();
    orderApi.updateStatus(order._id, status)
    .then(data => alert(data.message))
}
if(order)
    return(
        <div> 
            <div className = 'details'> 
                <h3> Order Details </h3>
                <p> Order Code: <b>{order._id} </b> </p>
                <p> ordered On: {new Date(order.created).toDateString()} </p>
                </div>
            <hr />
            <Container> 
                <Row> 
                    <Col> 
                    <div style= {{color: 'red'}}>Order Status: {order.status} </div>
                    <Can
                    role = {currentUser.isAdmin}
                    perform = 'order:edit'
                    yes = {() =>
                        <Form inline onSubmit = {handleStatusChange} > 
                        <Input type='select' name='status' onChange = {e => setStatus(e.target.value)}>
                            <option>Pending </option>
                            <option>Processing </option>
                            <option>Shipped </option>
                            <option>Delivered </option>
                            <option>Cancelled </option>
                        </Input>
                        <Button outline color='success' >Save</Button>
                    </Form>
                    }
                    />
                    
                        <Table responsive >
                            <thead>

                                <tr>
            <th>Meal</th>
            <th>subTotal</th>
          </tr>
        </thead>
        <tbody>
            {
                order.meals.map(meal =>
                    <tr key = {meal._id}> 
                        <td><img src= {meal.image} alt='meal' height= '80px' width= '80px'/>
                         <Link to = {`/meal/${meal.mealId}`} > {meal.name} </Link> <br />
                         {`${meal.price} x ${meal.quantity}`}
                         </td>
                        <td>{formatter.format(Number(meal.price*meal.quantity))}</td>
                    </tr> 
                )
            }
        </tbody>
      </Table>
      <div> <b>Total</b>: {formatter.format(Number(orderHelper.getTotalPrice(order)))} </div> <br />
                    </Col>
                    <Col> 
                    <Card>
        <CardHeader>
            Deliver to: <br />
            <h4> {order.customerName} </h4> <br />
            {order.customerEmail} <br />
            {order.customerPhone}
        </CardHeader>
        <CardBody>
          <CardTitle>{order.deliveryAddress.street},</CardTitle>
          <CardText>{order.deliveryAddress.city}, </CardText>
          <CardText>{order.deliveryAddress.state}. </CardText>
          
        </CardBody>
        <CardFooter>Thanks for shoping with us, You can track the status of your purchased items on this page.</CardFooter>
      </Card>

                    </Col>
                </Row>
            </Container>
        </div>

    )
    return <div> cant find order </div>
}
export default Order;