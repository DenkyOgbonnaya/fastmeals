import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

const ViewMeal = () => {
    const[meal, setMeal] = useState({});
    const[mealId] = useGlobal('mealId');

    useEffect( () => {
        fetch(`api/meals/${mealId}`)
        .then(res => {
            if(res.status === 200 )
                return res.json();
        })
        .then(data => {
            setMeal(data.meal)
        })
        .catch(err => console.log(err))
    })
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
                alert('meal added to your cart')
        })
        .catch(err => console.log(err))
    }

    if(!meal)
        return(<div>Select a meal to view </div>)
     return (
        <div > 
            <Card >
                <CardImg top height='200px' width='200px' src= {meal.image} alt="Card image cap" />
                    <CardBody>
                            <CardTitle><b>Name</b>: {meal.name} </CardTitle>
                            <CardSubtitle><b>Price</b>: N{meal.price} </CardSubtitle>
                            <CardText ><b>Category</b>: {meal.category} </CardText>
                            <CardText ><b>Stock</b>: {meal.quantity} </CardText>
                            <CardText> <small className='text-muted'> {meal.description} </small> </CardText>
                            <Button onClick = {() => addToCart(meal)} > Buy Now </Button>
                        </CardBody>
                    </Card>
        </div>
     )
}
export default ViewMeal;