const Cart = require('../model/cartModel');

const cartController = {
    /**
     * Add meal to cart
     * @param {obj} req  request object
     * @param {obj} res response object
     */
    addToCart(req, res){
        const{name, price, mealId, cartId } = req.body;
        //checks if there is a meal in the users cart
        Cart.countDocuments({})
        .then(count => {
            if(count === 0){
                Cart.create({
                    mealId,
                    name,
                    price,
                    subTotal: price*1,
                    quantity: 1,
                    cartFor: cartId
                })
                .then(meal => res.status(201).send({message: 'meal added to cart', meal}))
            }else{
                //check if a meal been added to cart already exist
                //increment  quantity if true, else add new meal
                Cart.findOne({mealId, cartFor: cartId})
                .then(meal => {
                    if(meal){
                        meal.quantity++
                        meal.subTotal = meal.price*meal.quantity

                        return meal.save()
                    }else{
                        return Cart.create({
                            mealId,
                            name,
                            price,
                            subTotal: price*1,
                            quantity: 1,
                            cartFor: cartId
                        })
                    }
                })
                .then(cart => res.status(201).send({message: 'meal added to cart', cart}))
                .catch(err => res.status(500).send(err))

            }
        })
        .catch(err => res.status(500).send(err))
        

    },
    /**
     * remove meal from cart
     * @param {obj} req  request object
     * @param {obj} res response object
     */
    removeFromCart(req, res){
        const{mealId, cartId} = req.params;
        Cart.findOneAndRemove({mealId, cartFor: cartId})
        .then(() => res.status(200).send({message: 'meal removed from cart'}))
        .catch(err => res.status(500).send(err))
    },
    /**
     * get cart
     * @param {obj} req  request object
     * @param {obj} res response object
     * @returns {obj} send cart objeect to client
     */
    getCart(req, res){
        Cart.find({cartFor: req.params.cartId})
        .then(cart => res.status(200).send({cart}))
        .catch(err => res.status(500).send(err))
    }
}
module.exports = cartController;