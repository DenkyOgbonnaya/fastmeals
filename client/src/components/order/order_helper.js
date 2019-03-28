const orderHelper = {
    getTotalPrice(order){
        const totalPrice = order.meals.map(meal => meal.subTotal).reduce( (acc, val) =>  acc + val, 0 );
        return totalPrice
    }
}
export default orderHelper;