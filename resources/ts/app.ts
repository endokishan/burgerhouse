import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(item) {
    axios.post('/update-cart', item).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'warning',
            theme : 'metroui',
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