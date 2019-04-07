import Swal from 'sweetalert2';

const mealApi = {
    createMeal(meal){
        return fetch('api/meals', {
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
        fetch(`api/meals/${mealId}`, {
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
        fetch(`api/meals/${id}`, {
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
        return fetch('api/categories')
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
    addCategory(){
        return Swal.fire({
            title: 'Add a new meal category',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: title => {
              return fetch(`api/categories`, {
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json',
                      'Authorization': `Bearer ${localStorage.userToken}`
                    },
                    body: JSON.stringify({title})
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                title: `${result.value.message}`
              })
              return result.value.category;
            }
          })
    }
}
export default mealApi;