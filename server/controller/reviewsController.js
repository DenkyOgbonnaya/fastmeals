const Review = require('../model/reviewsModel');

const reviewsController = {
    async create(req, res) {
        const{mealId, customerName, text} = req.body;

        try{
            const review = await Review.create({
                mealId,
                reviewer: customerName,
                text
            })
            return res.status(201).send({status: 'success', message:'review added', review});
        }catch(err){}
        
    },
    async getReviews(req, res){
        const{mealId} = req.params;
        console.log(mealId);
        
        try{
            const reviews = await Review.find({mealId: mealId});
            if(reviews.length > 0)
                return res.status(200).send({status: 'success', reviews});
            return res.status(404).send({message:'No reviews for this meal'});
        }catch(err){
            console.log(err);
            
            return res.status(400).send({message:'Bad request'})
        }
    },
    async upvote(req, res) {
        const{reviewId, customerId} = req.params;
        
        try{
           let review = await Review.findOne({_id: reviewId});
           
           review.upVote(customerId);

           res.status(200).send({
               status:'success',
               upVoters: review.upVoters,
               upVotes: review.upVotes
           })
        }catch(err){
            console.log(err);
            res.status(500).send(err)
            
        }
    },
    async downvote(req, res){
        const{reviewId, customerId} = req.params;
        try{
           let review = await Review.findById(reviewId);
           review.downVote(customerId);

           res.status(200).send({
               status:'success',
               downVoters: review.downVoters,
               downVotes: review.downVotes
           })
        }catch(err){
            console.log(err);
            res.status(500).send(err)
            
        }
    }
}

module.exports = reviewsController;