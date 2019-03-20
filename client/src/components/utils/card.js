import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {withRouter, Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col, ButtonGroup} from 'reactstrap';
import filterHof from '../utils/filterHof';
import UpdateMeal from '../updateMeal';
import addToCart from '../utils/addToCart';

const Cards = (props) => {
    const[searchedMeal] = useGlobal('searchedMeal');
    const[meals, setMeals] = useState([]);
    const[meal, setMeal] = useState({});
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
    async function pushToCart(meal){
        try{
            await addToCart(meal);
            props.history.push('/cart');
        } catch(err) {
            console.log(err)
        }
    }
    
    return(
        <div> 
            {renderUpdateMealModal ? <UpdateMeal meal= {meal}/> : null }
            
            <Container> 
                <Row>
                {meals.filter(filterHof(searchedMeal)).map(meal =>
                <Col xs= '6' md = '3' key ={meal._id}> 
                    <Card >
                        <CardImg top width="100%" height="150px" src= {meal.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description.substring(0, 20)} 
                            ...<Link to = {`/meal/${meal._id}`} >more </Link> </small>
                             </CardText>
                            <ButtonGroup >
                            <Button onClick= {() => pushToCart(meal)} >Buy</Button>
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