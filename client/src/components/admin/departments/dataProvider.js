const dataProvider = {
    create(name, description){
        return fetch(`/api/departments`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${localStorage.userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, description})
        })
        .then(res => {
            if(res.status === 201)
            return res.json();
        })
        .catch(err => console.log(err))
    },
    getDepartments(){
        return fetch('/api/departments')
        .then(res => {
            if(res.status === 200)
            return res.json();
        })
        .catch(err => console.log(err))
    },
    editDepartment(name, description){
        return fetch(`/api/departments`, {
            method: 'PUT',
            headers: {
                'authorization': `bearer ${localStorage.userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, description})
        })
        .then(res => {
            if(res.status === 200)
            return res.json
        })
        .catch(err => console.log(err))
    }
}
export default dataProvider;