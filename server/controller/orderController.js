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
            userId
        })
        .then((order) => {
            Cart.deleteMany({cartFor: cart[0].cartFor}).exec();
            return res.status(201).send({message: 'you order has been placed', order})
        })
        .catch(err => {console.log(err), res.status(500).send(err)})   
    },
    /** 
    * get a users order
    * @param req{obj} request
    * @param req{obj} request
    * @returns {obj} orders
    * @route '/userId/order'
    */
   getOrder(req, res){
    User.findById(req.params.userId)
    .populate('orders')
    .then(user => {
        if(user){
            res.status(200).send({message: 'order found', order: user.orders})
        }
    })
    .catch(err => res.status(500).send(err))
}

}
module.exports = orderController;
