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
    createOrder(req, res){
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
            return res.status(201).send({message: 'you order has been placed', orderId: order._id})
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
    .catch(err => res.status(500).send(err))
    }

}
module.exports = orderController;
