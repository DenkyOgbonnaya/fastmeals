import React from 'react';
import {useGlobal} from 'reactn';
import {Card, CardImg, CardText, CardBody, 
    CardTitle, CardSubtitle, Button, Container, Row, Col,} from 'reactstrap';
import addToCart from '../cart/addToCart';
import {Link} from 'react-router-dom';

const SearchList = (props) => {
    const[cart, setCart] = useGlobal('cart');

    function pushToCart(meal){
        
            addToCart(meal)
            .then(() => setCart(cart.concat(meal)) )
            
        
    }

    return(
        <div>
            <Container> 
                <Row>
                {props.result.map(meal =>
                <Col  md = '3' key ={meal._id}> 
                    <Card >
                        <CardImg top width="100%" height="150px" src= {meal.image} alt="Card image cap" />
                        <CardBody >
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description.substring(0, 20)} 
                            ...<Link to = {`/meal/${meal._id}`} >more </Link> </small>
                             </CardText>
                            <Button onClick= {() => pushToCart(meal)}  >Buy</Button>{" "}
                        </CardBody>
                    </Card>
                    <br />
                </Col>
                )} 
            </Row>
            </Container>
        </div>
    )
} 
export default SearchList;