const addToCart = (meal) => {
    fetch('api/cart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: meal.name,
            price: meal.price,
            image: meal.image,
            mealId: meal._id,
            cartId: localStorage.cartId
        })
    })
    .then(res => {
        if(res.status === 201)
            return 'meal aded';
    })
    .catch(err => console.log(err))
}
export default addToCart;