import axios from 'axios';
import Noty from 'noty';
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