import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import { initAdmin } from './Admin';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
let removeItem = document.querySelectorAll('.removeItem');

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

// Calling Admin 
initAdmin();

// delete cart items
// function deleteCart() {
//     axios.post('/update-cart').then(res => {
//         let data = res.data.item;
//         console.log(data);
//     })
// }

// removeItem.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         deleteCart()
//     })
// })

// change order status
let statuses = document.querySelectorAll('.status-line');
let hidden = document.querySelector('#hidden');
let order = hidden ? hidden.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

function updateStatus(order) {
    let stepCompleted = true;
    statuses.forEach((status) => {
        let getData = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('step-compeleted');
        };
        if (getData === order.status) {
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            status.appendChild(time);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }
        }
    })
}
updateStatus(order);