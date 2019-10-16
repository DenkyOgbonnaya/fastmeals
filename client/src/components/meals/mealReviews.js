import React from 'react';
import {Button} from 'reactstrap';
import '../../styles/viewMeal.css';

const MealReview = ({reviews, upvote, downvote, userId}) => {
    
    if(reviews.length === 0)
        return (
            <div> No reviews for this meal</div>
        )
    return (
        <div className='meal-review'> 
            {reviews.map( review => 
                <div key ={review._id} > 
                    <span className = 'reviewer-name'> {review.reviewer} </span>
                    <span> <small>{new Date(review.createdAt).toDateString()} </small> </span>
                    <p> {review.text} </p>
                    { userId && <span className='upvote' onClick = {() => upvote(review._id)} > <Button size='sm' disabled= {review.upVoters.includes(userId)} >Upvote </Button>  </span> }
                    <span className='upvote-counter'> {'>'} { review.upVotes} </span>
            { userId && <span className='downvote' onClick= { () => downvote(review._id)} > <Button size='sm' disabled= {review.downVoters.includes(userId)} >Downvote </Button> </span> }
                    <span className='downvote-counter'> {'<'} {review.downVotes}  </span>
                    <hr />
                </div>
            )}
        </div>
    )
}

export default MealReview;