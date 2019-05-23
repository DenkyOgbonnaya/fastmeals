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
            if(res.status === 201)
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
        fetch(`/api/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.userToken}`
            }
        })
        .then(res => {
            if(res.status === 200 ){
              //ToDo
            }
        })
        .catch(err => console.log(err))
    },
    updateMeal(id, data){
        fetch(`/api/meals/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.userToken}`
            },
            body: JSON.stringify(data)
          })
          .then(res => {
            if(res.status === 200){
              //ToDo
            }
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
    }
}
export default mealApi;