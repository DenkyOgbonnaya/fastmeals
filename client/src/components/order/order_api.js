const orderApi = {
    createOrder(userId, orderDetails){
        const userToken = localStorage.userToken;
        return fetch(`api/${userId}/order`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(orderDetails)
        })
        .then(res => {
            if(res.status === 201)
            return res.json();
        })
        .catch(err => console.log(err))
    },
    getOrders(userId){
        return fetch(`/api/${userId}/order`)
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            return data.orders;
        })
    },
    getOrder(orderId){
        return fetch(`/api/order/${orderId}`)
        .then(res => {
            if(res.status === 200)
            return res.json();
        })
        .then(data => {
            return data.order;
        })
        .catch(err => console.log(err))
    },
    deleteOrder(orderId){
        fetch(`/api/order/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.userToken}`
            },
        })
        .then(res => {
            if(res.status === 200)
           return 'order deleted'
        })
        .catch(err => console.log(err))
    },
    getOrderInStatus(orderStatus){
        return fetch(`/api/order/${orderStatus}/status`)
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .catch(err => console.log(err))
    }
}

export default orderApi;