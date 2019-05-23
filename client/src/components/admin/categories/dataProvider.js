const dataProvider = {
    create(name, department){
        return fetch(`/api/categories`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${localStorage.userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, department})
        })
        .then(res => {
            if(res.status === 201)
            return res.json();
        })
        .catch(err => console.log(err))
    },
    getCategories(dept){
        const api = dept ? `/api/categories?department=${dept}` : '/api/categories'
        return fetch(api)
        .then(res => {
            if(res.status === 200)
            return res.json();
        })
        .catch(err => console.log(err))
    },
    editCategory(id, name, department){
        return fetch(`/api/categories/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': `bearer ${localStorage.userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, department})
        })
        .then(res => {
            if(res.status === 200)
            return res.json
        })
        .catch(err => console.log(err))
    },
    getCategoriesInDept(dept){
        return fetch(`/api/categories/inDept/${dept}`)
        .then(res => {
            if(res.status === 200)
            return res.json();
        })
        .catch(err => console.log(err))
    },
}
export default dataProvider;