const cartApi = {
    getCart(){
        const cartId = localStorage.cartId;
        return fetch(`api/cart/${cartId}`)
        .then(res => {
          if(res.status === 200)
            return res.json();
        })
        .then(data => {
          return data.cart;
        })
        .catch(err => console.log(err))

    },
    removeMeal(mealId, cartId){
        fetch(`api/cart/${cartId}/${mealId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.status === 200){
              //do nothing
            }
              
        })
        .catch(err => console.log(err))
    },
    updateQuantity(quantity, mealId){
        const cartId = localStorage.cartId;

        fetch(`api/cart/${cartId}/${mealId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-TYpe': 'application/json'
            },
            body: JSON.stringify({quantity})
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
           //do something
        })
        .catch(err => console.log(err))
    }
}
export default cartApi;