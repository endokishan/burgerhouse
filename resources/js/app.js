import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import {
    initAdmin
} from './Admin';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'warning',
            theme: 'metroui',
            timeout: 1500,
            text: `${res.data.itemName} added to Cart`
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1500,
            text: `Something went Wrong`
        }).show();
    });
};

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let item = JSON.parse(btn.dataset.burger);
        updateCart(item);
    });
});

// Removing Successful order alert message
const alertMsg = document.querySelector('#success-alert');
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 2000);
};


// change order status
let statuses = document.querySelectorAll('.status-line');
let hidden = document.querySelector('#hidden');
let order = hidden ? hidden.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

function updateStatus(Uorder) {
    statuses.forEach((status) => {
        status.classList.remove('step-compeleted');
        status.classList.remove('current');
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let getData = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('step-compeleted');
        };
        if (getData === Uorder.status) {
            stepCompleted = false;
            time.innerText = moment(Uorder.updatedAt).format('hh:mm A');
            status.appendChild(time);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }
        }
    })
}

updateStatus(order);

// Ajax Call
const paymentForm = document.querySelector('#payment-form');

if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(paymentForm);
        let formObject = {};

        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        axios.post('/orders', formObject).then((res) => {
            new Noty({
                type: 'warning',
                theme: 'metroui',
                timeout: 1000,
                text: res.data.message
            }).show();

            // resirect to customer order page
            setTimeout(() => {
                window.location.href = '/customer/orders';
            }, 1000);

        }).catch((err) => {
            new Noty({
                type: 'error',
                theme: 'metroui',
                timeout: 1000,
                text: err.res.data.message
            }).show();
        });
    });
}



// Socket
let socket = io();



// join room
if (order) {
    socket.emit('join', `order_${order._id}`);
};

let adminPath = window.location.pathname;
if (adminPath.includes('admin')) {
    // Calling Admin 
    initAdmin(socket);
    socket.emit('join', 'adminRoom');
};

socket.on('orderUpdated', (data) => {
    const updatedOrder = {
        ...order
    };
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);
    new Noty({
        type: 'warning',
        theme: 'metroui',
        timeout: 1500,
        text: `Your Order ${data.status}`
    }).show();
})