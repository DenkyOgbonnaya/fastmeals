const cartHelper = {
    increaseQuantity(mealId, cart){
        const updatedCart = cart.map(meal => 
            meal.mealId === mealId ? Object.assign({}, meal, {quantity: meal.quantity+1}) : meal
        )
        return updatedCart;
    },
    decreaseQuantity(mealId, cart){
        const updatedCart = cart.map(meal => 
            meal.mealId === mealId ? Object.assign({}, meal, {quantity: meal.quantity-1}) : meal
        )
        return updatedCart;
    },
    getTotalPrice(cart){
        const totalPrice = cart.map(meal => meal.price*meal.quantity).reduce( (acc, val) =>  acc + val, 0 )
        return totalPrice;
    }
}
export default cartHelper;