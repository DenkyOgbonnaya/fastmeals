const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    mealId: mongoose.Schema.Types.ObjectId,
    reviewer: String,
    text: String,
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    upVoters: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    upVoters: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    downVoters: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

reviewsSchema.methods.upVote = function (customerId){
    this.upVotes+=1;
    this.upVoters.push(customerId);
    this.save();
}
reviewsSchema.methods.downVote = function (customerId){
    this.downVotes+=1;
    this.downVoters.push(customerId);
    this.save();
}

module.exports = mongoose.model('Review', reviewsSchema);