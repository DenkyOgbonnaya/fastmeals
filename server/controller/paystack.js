const mongoose = require('mongoose');
const request = require('request');
const {initializePayment, verifyPayment} = require('../services/paystack_setup')(request);
const _ = require('lodash');
const Orders = require('../model/orderModel');

const paystackController = {
    startPayment(req, res){
        const amount = req.body.cart.map(meal => meal.price * meal.quantity).reduce((acc,val) => acc + val, 0);
        const{customerEmail, customerName} = req.body;
        
        const form = {
            amount: amount * 100,
            email: customerEmail
        }
        form.metadata = {
            name : customerName,
            orderId: res.locals.orderId.toString()
        }
        
        initializePayment(form, (error, body)=>{
            if(error){
                //handle errors
                console.log(error);
                return;
           }
           response = JSON.parse(body);
           const authUrl = response.data.authorization_url;
           res.status(201).send({message: response.message, authUrl})
        });
    },
     verifyPayment(req, res){
        const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            return res.send(error);
        }
        const response = JSON.parse(body);
        const data = _.at(response.data, ['reference', 'metadata.name', 'metadata.orderId']);
        const[reference, name, orderId] = data;
        const id = mongoose.Types.ObjectId(orderId)

        Orders.findById(id)
        .then(order => {
            order.payment_id = reference,
            order.status = 'Processing'
            order.save();
           
            res.redirect(`http://localhost:3000/order/${order._id}`)
        })
        .catch(err => console.log(err))
    })

    }
}
module.exports = paystackController;
