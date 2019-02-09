const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/fastmeals';

const connectToDb = () => {
    mongoose.connect(dbUrl, {useNewUrlParser: true})
    .then(() => console.log('connected to Fastmeal db'))
    .catch(err => console.log(err))
}

module.exports = connectToDb;
