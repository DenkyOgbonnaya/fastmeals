const Order = require('../model/orderModel');
const User = require('../model/userModel');
const Cart = require('../model/cartModel').Cart;

const orderController = {
/**
 * add a new order to db
 * @param req {obj} request object
 * @param res {obj} response object
 * @returns {obj} order 
 * @route '/:userId/orders'
 */
    createOrder(req, res, next){
        const {userId} = req.params
        const{cart, customerName, customerEmail, customerPhone, deliveryAddress} = req.body;

        Order.create({
            meals: cart,
            customerName,
            customerEmail,
            customerPhone,
            deliveryAddress,
            user: userId
        })
        .then((order) => {
            Cart.deleteMany({cartFor: cart[0].cartFor}).exec();
            res.locals.orderId = order._id
            next();
        })
        .catch(err => {console.log(err), res.status(500).send(err)})   
    },
    /** 
    * get a users order
    * @param req{obj} request
    * @param req{obj} request
    * @returns {obj} orders
    * @route '/order/orderId'
    */
   getOrder(req, res){
    Order.findById(req.params.orderId)
    .then(order => {
        if(order)
           return res.status(200).send({message: 'order found', order})
        res.status(500).send({message: 'order not found'})
    })
    .catch(err => res.status(500).send(err))
    },
    /** 
    * get all users order
    * @param req{obj} request
    * @param req{obj} request
    * @returns {obj} orders
    * @route '/userId/order'
    */
   getOrders(req, res){
    const user =  req.params.userId;
    Order.find({user})
    .then(orders => {
        if(orders)
           return res.status(200).send({message: 'order found', orders})
        res.status(500).send({message: 'order not found'})
    })
    .catch(err => res.status(400).send(err))
    },
    deleteOrder(req, res){
        Order.findByIdAndRemove(req.params.orderId)
        .then(() => res.status(200).send({message: 'Order deleted'}))
        .catch(err => res.status(400).send(err))
    },
    getOrdersInStatus(req, res){
        const{status} = req.params;
        Order.find({status})
        .then(orders => res.status(200).send({orders}))
        .catch(err => res.status(400).send(err))
    }

}
module.exports = orderController;
