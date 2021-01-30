import axios from 'axios';
import Noty from 'noty';

export function postOrder(formObject) {
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
}