require('dotenv').config();

const paystack = (request) => {
    const secretKey = `Bearer ${process.env.PAYSTACK_SK}`;
   const initializePayment = (form, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/initialize',
        headers : {
            authorization: secretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        },
       form
    }
    request.post(options, (error, response, body ) => {
        return mycallback(error, body);
    });
   }
   const verifyPayment = (ref, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref    ),
        headers : {
            authorization: secretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       }
    }

    request(options,  (error, response, body)=> {
        return mycallback(error, body) })
   }
   return {initializePayment, verifyPayment};
}
module.exports = paystack;