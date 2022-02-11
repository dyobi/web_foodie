import Axios from 'axios';

/* ----------------------------------------------------- */

/*
    method: 
        GET
    url: 
        /api/order/id/:id
    parameter: 
        null
    result:
        status:
            200: success
            400: failure
    using at:
        book
*/
export const getOrderList = (id, cb) => {

    const url = `/api/order/id/${id}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/* ----------------------------------------------------- */

/*
    method: 
        POST
    url: 
        /api/order
    parameter: 
        id, list, price, orderDate, orderHour
    result:
        status:
            200: success
            400: failure
    using at:
        book
*/
export const postOrderList = (id, list, price, orderDate, orderHour, cb) => {

    const url = '/api/order/';
    const data = {
        id,
        list,
        price,
        orderDate,
        orderHour
    };

    Axios.post(url, data)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb({
                status: 400
            });
        });
};

/* ----------------------------------------------------- */