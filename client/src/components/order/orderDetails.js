import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Form, Input, Button} from 'reactstrap';

const orderDetials = () => {
    return (
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
    )
}