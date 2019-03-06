import React, {useState, useEffect} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';

const useGetMeals = (api) => {
    const[meals, setMeals] = useState([])

    useEffect( () => {
        fetch(api)
        .then(res => {
            if(res.status === 200)
            return res.json()
        })
        .then(data => {
            setMeals(data.meals)
        })
        .catch(err => console.log(err))
        
    }, []);
    const addToCart = (meal) => {
        fetch('api/cart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: meal.name,
                price: meal.price,
                image: meal.image,
                mealId: meal._id,
                cartId: localStorage.cartId
            })
        })
        .then(res => {
            if(res.status === 201)
                alert('meal added to cart')
        })
        .catch(err => console.log(err))
    }
    return(
        <div> 
            <Container> 
                <Row>
                {meals.map(meal =>
                <Col md = '3' key ={meal._id}> 
                    <Card  >
                        <CardImg top width="100%" height="30%" src= {meal.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description} </small> </CardText>
                            <Button onClick= {() => addToCart(meal)} >Buy Now</Button>
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
export default useGetMeals;