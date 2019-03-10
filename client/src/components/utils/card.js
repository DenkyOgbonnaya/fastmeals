import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {withRouter} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col, ButtonGroup 
    } from 'reactstrap';
import UpdateMeal from '../updateMeal';

const Cards = (props) => {
    const[meals, setMeals] = useState([]);
    const[meal, setMeal] = useState({});
    const[mealId, setMealId] = useGlobal('mealId')
    const[renderUpdateMealModal, setRenderUpdateMealModal] = useGlobal('renderUpdateMealModal');
    const[showUpdateMealsButton, setShowUpdatMealsButton] = useGlobal('showUpdateMealsButton');
    const[showDeleteMealsButton, setShowDeleteMealsButton] = useGlobal('showDeleteMealsButton');
    
    useEffect( () => {
        fetch(props.api)
        .then(res => {
            if(res.status === 200)
            return res.json()
        })
        .then(data => {
            setMeals(data.meals)
        })
        .catch(err => console.log(err))
        
    }, [props.api]);
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
    const viewMeal = id => {
        setMealId(id);
        props.history.push('/meal')
    }
    return(
        <div> 
            {renderUpdateMealModal ? <UpdateMeal meal= {meal}/> : null }
            
            <Container> 
                <Row>
                {meals.map(meal =>
                <Col md = '3' key ={meal._id}> 
                    <Card onClick = { () => viewMeal(meal._id)} >
                        <CardImg top width="100%" height="150px" src= {meal.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description.substring(0, 30)} </small> </CardText>
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
export default withRouter(Cards);