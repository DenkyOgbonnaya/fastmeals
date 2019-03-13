const express = require('express');
const cors = require('cors');
const connectToDb = require('./server/model/dataBase');
const UserRouter = require('./server/routes/userRoutes');
const MealRouter = require('./server/routes/mealRoutes');
const CartRouter = require('./server/routes/cartRoutes');
const CategRouter = require('./server/routes/categoRoutes');
const orderRouter = require('./server/routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.static(__dirname + '/public'))
app.use(UserRouter);
app.use(MealRouter);
app.use(CartRouter);
app.use(CategRouter);
app.use(orderRouter);

app.options('*', cors());
app.use('/api/users', UserRouter);
app.use('/api', MealRouter);
app.use('/api', CartRouter);
app.use('/api', CategRouter);
app.use('/api', orderRouter);

const PORT = process.env.PORT || 8080;

connectToDb();

app.listen(PORT, err => { 
    if(err) throw err;
    console.log('Fastmeals listening on port', PORT);
});