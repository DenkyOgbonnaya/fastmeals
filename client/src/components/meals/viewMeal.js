import React, {useState, useEffect} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import addToCart from '../cart/addToCart';

const ViewMeal = (props) => {
    const[meal, setMeal] = useState({});

    useEffect( () => {
        const mealId = props.match.params.mealId;
        fetch(`/api/meals/${mealId}`)
        .then(res => {
            if(res.status === 200 )
                return res.json();
        })
        .then(data => {
            setMeal(data.meal)
        })
        .catch(err => console.log(err))
    }, [])
    async function pushToCart(meal){
        try{
            await addToCart(meal);
            props.history.push('/cart');
        } catch(err) {
            console.log(err)
        }
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
                            <Button onClick = {() => pushToCart(meal)} > Buy Now </Button>
                        </CardBody>
                    </Card>
        </div>
     )
}
export default ViewMeal;