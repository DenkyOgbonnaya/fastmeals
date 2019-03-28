import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../../styles/order.css';

const Order = (props) => {
const[order, setOrder] = useState({deliveryAddress: {}, meals: [] });
useEffect( () => {
    fetch(`/api/order/${props.match.params.orderId}`)
    .then(res => {
        if(res.status === 200)
            return res.json();
    })
    .then(data => {
        setOrder(data.order)
    })
    .catch(err => console.log(err))
}, []);

const getTotalPrice = () => {
    const totalPrice = order.meals.map(meal => meal.subTotal).reduce( (acc, val) =>  acc + val, 0 );
    return totalPrice
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
                        <Table responsive >
                            <thead>

                                <tr>
            <th>Meal</th>
            <th>subTotal</th>
            <th>status</th>
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
                        <td>{meal.subTotal}</td>
                        <td>{meal.status}</td>
                    </tr> 
                )
            }
        </tbody>
      </Table>
      <div> <b>Total</b>: {getTotalPrice()} </div> <br />
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