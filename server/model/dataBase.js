const mongoose = require('mongoose');
require('dotenv').config();

const{MONGODB_URL} = process.env;

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/fastmeals';

const connectToDb = () => {
    mongoose.connect(dbUrl, {useNewUrlParser: true})
    .then(() => console.log('connected to Fastmeal db'))
    .catch(err => console.log(err))
}

module.exports = connectToDb;
