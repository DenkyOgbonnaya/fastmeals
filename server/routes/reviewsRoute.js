const ReviewsRouter = require('express').Router();
const reviewCtrl = require('../controller/reviewsController');

const{create, getReviews, upvote, downvote} = reviewCtrl;

ReviewsRouter.route('/reviews')
.post(create)
ReviewsRouter.route('/reviews/:mealId')
.get(getReviews)
ReviewsRouter.post('/reviews/:reviewId/:customerId/upvote', upvote);
ReviewsRouter.post('/reviews/:reviewId/:customerId/downvote', downvote);

module.exports = ReviewsRouter;