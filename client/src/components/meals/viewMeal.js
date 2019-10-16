import React, {useState, useEffect} from 'react';
import { Table, Button, Container, Row, Col} from 'reactstrap';
import addToCart from '../cart/addToCart';
import mealsApi from './meals_api';
import formatter from '../utils/formatter';
import '../../styles/viewMeal.css';
import ToggleableReviewForm from './toggleableReviewForm';
import {useGlobal} from 'reactn';
import MealReviews from './mealReviews';

const ViewMeal = (props) => {
    const[meal, setMeal] = useState({});
    const[reviews, setReviews] = useState([]);
    const[text, setText] = useState('');
    const[currentUser] = useGlobal('currentUser');

    const submitReview = e => {
        e.preventDefault();

        const mealId = props.match.params.mealId;
        const{userName} = currentUser;

        mealsApi.addReview(mealId, userName, text)
        .then(data => {
            if(data && data.status === 'success'){
                setReviews(reviews.concat(data.review));

            }else
            alert(data.message)
        })
    }

    useEffect( () => {
        const mealId = props.match.params.mealId;
        Promise.all([mealsApi.getMeal(mealId), mealsApi.getReviews(mealId)])
        .then(([mealData, reviewsData]) => {
            
            setMeal(mealData.meal);
            if(reviewsData)
            setReviews(reviewsData.reviews)
        })
        
    }, [])
    async function pushToCart(meal){
        try{
            await addToCart(meal);
            props.history.push('/cart');
        } catch(err) {
            console.log(err)
        }
    }
    const upvote = reviewId => {
        setReviews(reviews.map(review => 
            review._id === reviewId ? Object.assign({}, review, {upVotes: review.upVotes +1}) : review))

        mealsApi.upvote(reviewId, currentUser._id)
        .then(data => {
            if(data && data.status === 'success'){
                setReviews(reviews.map(review => 
                    review._id === reviewId ? Object.assign({}, review, {upVoters: data.upVoters, upVotes: data.upVotes}) : review))
        
            }else 
                setReviews(reviews.map(review => 
                    review._id === reviewId ? Object.assign({}, review, {upVotes: review.upVotes -1}) : review))
        })
    }
    const downvote = reviewId => {
        setReviews(reviews.map(review => 
            review._id === reviewId ? Object.assign({}, review, {downVotes: review.downVotes +1}) : review))

        mealsApi.downvote(reviewId, currentUser._id)
        .then(data => {
            if(data && data.status === 'success'){
                setReviews(reviews.map(review => 
                    review._id === reviewId ? Object.assign({}, review, {downVoters: data.downVoters, downVotes: data.downVotes}) : review))
            }else 
                setReviews(reviews.map(review => 
                    review._id === reviewId ? Object.assign({}, review, {downVotes: review.downVotes -1}) : review))
            
        })
    }
    if(!meal)
        return(<div>Select a meal to view </div>)
     return (
        <div className='meal-details' > 
        <h3>Meal Details </h3>
            <Container>
                <Row>
                    <Col md='4'>
                        <img src= {meal.image} className='meal-image' alt="Meal image" />
                    </Col>
                    <Col md= {{size:6, offset: 1} }>
            <Table  size='md' > 
                <tbody> 
                    <tr> 
                        <td> <b>Name</b> </td>
                        <td> {meal.name} </td>
                    </tr>
                    <tr> 
                        <td> <b>Price</b> </td>
                        <td> {meal.price} </td>
                    </tr>
                    <tr> 
                        <td> <b>category</b> </td>
                        <td> {meal.category} </td>
                    </tr>
                    <tr> 
                        <td> <b>Stock</b> </td>
                        <td> {meal.quantity} </td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            </Row>
            </Container>
            <h4>Description </h4>
            <p> {meal.description} </p>
            <Button style = {{background:'firebrick'}} onClick = {() => pushToCart(meal)} > Buy Now </Button>
            <hr />
            <h4>Reviews </h4>
            { (currentUser && currentUser._id) && <ToggleableReviewForm 
                handleSubmit = {submitReview} 
                setText= {setText}  
            /> }
            <MealReviews 
                reviews = {reviews} 
                upvote = {upvote}
                downvote = {downvote}
                userId = {currentUser._id}
            />
        </div>
     )
}
export default ViewMeal;