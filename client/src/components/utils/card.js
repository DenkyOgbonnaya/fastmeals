import React, {useState, useEffect} from 'react';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col, ButtonGroup 
    } from 'reactstrap';
import {useGlobal} from 'reactn';
import UpdateMeal from '../updateMeal';

const useGetMeals = (api) => {
    const[meals, setMeals] = useState([]);
    const[meal, setMeal] = useState({})
    const[renderUpdateMealModal, setRenderUpdateMealModal] = useGlobal('renderUpdateMealModal');
    const[showUpdateMealsButton, setShowUpdatMealsButton] = useGlobal('showUpdateMealsButton');
    const[showDeleteMealsButton, setShowDeleteMealsButton] = useGlobal('showDeleteMealsButton');

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
    const deleteMeal = id => {
        fetch(`api/meals/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            if(res.status === 200 ){
                alert('meal deleted')
            }
        })
        .catch(err => console.log(err))
    }
    const updateMeal = (meal) => {
        setMeal(meal);
        setRenderUpdateMealModal(true);
    }
    return(
        <div> 
            {renderUpdateMealModal ? <UpdateMeal meal= {meal}/> : null }
            
            <Container> 
                <Row>
                {meals.map(meal =>
                <Col md = '3' key ={meal._id}> 
                    <Card  >
                        <CardImg top width="100%" height="30%" src= {meal.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description.substring(0, 50)} </small> </CardText>
                            <ButtonGroup >
                            <Button onClick= {() => addToCart(meal)} >Buy</Button>
                            {showUpdateMealsButton ? <Button onClick = {() => updateMeal(meal) }> Update </Button> : null} 
                            {showDeleteMealsButton ? <Button onClick = {() => deleteMeal(meal._id)} > Delet </Button> : null}
                            </ButtonGroup>
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