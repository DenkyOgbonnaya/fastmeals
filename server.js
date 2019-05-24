const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-Parser')
const connectToDb = require('./server/model/dataBase');
const UserRouter = require('./server/routes/userRoutes');
const MealRouter = require('./server/routes/mealRoutes');
const CartRouter = require('./server/routes/cartRoutes');
const CategRouter = require('./server/routes/categoRoutes');
const deptRouter = require('./server/routes/department');
const orderRouter = require('./server/routes/orderRoutes');
const oauthRouter = require('./server/routes/oauth');
const paystackRouter = require('./server/routes/paystackRoute')
const passport = require('passport');
const passport_setup = require('./server/services/passport_setup');
const{cloudinaryConfig} = require('./server/services/cloudinary_setup');
const path = require ('path');

const app = express();
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.options('*', cors());
//app.use(express.static(__dirname + '/public'))
app.use(passport.initialize());
app.use('*', cloudinaryConfig)
app.use(UserRouter);
app.use(MealRouter);
app.use(CartRouter);
app.use(CategRouter);
app.use(orderRouter);
app.use(deptRouter);
app.use(oauthRouter);
app.use(paystackRouter);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + '/client/public'));

app.use('/api/users', UserRouter);
app.use('/api', MealRouter);
app.use('/api', CartRouter);
app.use('/api', CategRouter);
app.use('/api', orderRouter);
app.use('/api', deptRouter);
app.use('/auth', oauthRouter);
app.use('/paystack', paystackRouter);

const PORT = process.env.PORT || 8080;

connectToDb();

app.listen(PORT, err => { 
    if(err) throw err;
    console.log('Fastmeals listening on port', PORT);
});