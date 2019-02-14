const express = require('express');
const cors = require('cors');
const connectToDb = require('./server/model/dataBase');
const UserRouter = require('./server/routes/userRoutes');
const MealRouter = require('./server/routes/mealRoutes');
const CartRouter = require('./server/routes/cartRoutes')

const app = express();
app.use(express.json());
app.use(UserRouter);
app.use(MealRouter);
app.use(CartRouter);

app.options('*', cors());
app.use('/api/users', UserRouter);
app.use('/api', MealRouter);
app.use('/api', CartRouter);

const PORT = process.env.PORT || 8080;

connectToDb();

app.listen(PORT, err => { 
    if(err) throw err;
    console.log('Fastmeals listening on port', PORT);
});