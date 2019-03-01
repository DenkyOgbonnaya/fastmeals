const Order = require('../model/orderModel');
const User = require('../model/userModel');
const Cart = require('../model/cartModel');

const orderController = {
/**
 * add a new order to db
 * @param req {obj} request object
 * @param res {obj} response object
 * @returns {obj} order 
 * @route '/:userId/orders'
 */
    createOrder(req, res){
        const userId = req.params.userId;
        const{cart} = req.body;
        console.log('vvhggg',cart)

        const order = cart.map(meal => {
           return {
                meal: meal.name,
                quantity: meal.quantity,
                subTotal: meal.subTotal
            }
        })
        const totalPrice =  cart.map(meal => meal.subTotal ).reduce( (acc, val) =>  acc + val );

        Order.create({
            order,
            totalPrice
        })
        .then(order =>{
            User.findById(userId)
            .then(user => {
                user.orders.push(order._id);
               return user.save()
            })
            .then(() => {
                return Cart.deleteMany({cartFor: cart[0].cartFor}).exec()
            })
            .then(()=> {
                return res.status(201).send({message: 'you order has been placed', order})
            })
            .catch(err => {console.log(err), res.status(500).send(err)})   
        })

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
