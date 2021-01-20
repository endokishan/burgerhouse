import axios from "axios";

export class Admin {
    static initAdmin() {
        const orderTableBody = document.querySelector('#orderTableBody');
        let orders = [];
        let markup;

        axios.get('/admin/orders', {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => {
            orders = res.data;
            markup = generateMarkup(orders);
            orderTableBody.innerHTML = markup;
        }).catch(err => {
            console.log(err);
        });
    };
};

function generateMarkup(orders: any[]): any {
    throw new Error("Function not implemented.");
}
