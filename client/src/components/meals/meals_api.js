const mealApi = {
    createMeal(meal){
        return fetch('/api/meals', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            },
            body: meal
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
    },
    getMeals(api){
        return fetch(api)
        .then(res => {
            if(res.status === 200)
            return res.json()
        })
        .catch(err => console.log(err)) 
    },
    deleteMeal(mealId){
        return fetch(`/api/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
    },
    updateMeal(id, data, headers){
        return fetch(`/api/meals/${id}`, {
            method: 'PUT',
            headers: headers,
            body: data
          })
          .then(res => {
            return res.json();
          })
          .catch(err => console.log(err))
    },
    getCategories(){
        return fetch('/api/categories')
      .then(res => {
          if(res.status === 200) return res.json()
      })
      .catch(err => console.log(err))
    },
    getMeal(mealId){
        return fetch(`/api/meals/${mealId}`)
        .then(res => {
            if(res.status === 200 )
                return res.json();
        })
        .catch(err => console.log(err))
    },
    searchMeal(search, category){
        return fetch(`/api/meal?search=${search}&category=${category}`)
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
    },
    getReviews(mealId) {
        return fetch(`/api/reviews/${mealId}`)
        .then(res => {
            if(res.status === 200)
            return res.json();
        })
        .catch(err => console.log(err) )
    },
    addReview(mealId, customerName, text){
        return fetch(`/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            },
            body: JSON.stringify({mealId, customerName, text})
        })
        .then(res => {
        
            return res.json();
        })
        .catch(err => console.log(err))

    },
    upvote(reviewId, customerId){
        return fetch(`/api/reviews/${reviewId}/${customerId}/upvote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
    },
    downvote(reviewId, customerId){
        return fetch(`/api/reviews/${reviewId}/${customerId}/downvote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
    }
}
export default mealApi;