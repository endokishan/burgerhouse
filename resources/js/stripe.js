import {
    loadStripe
} from '@stripe/stripe-js';
import { postOrder } from './postOrder';


export async function initStripe() {
    // Load Stripe
    const stripe = await loadStripe('pk_test_51IFJekBzBgRoYoj8CFjxIsJ9Q6T3uuDEQl8xFfj4Pv3maV4wYneSq3zuMAe79DDSmkk0wPGCnkaV2TO0MYvL8oRm00p5ckmd0q');

    let card = null;

    function mountWidget() {
        const elements = stripe.elements();

        // Card Style
        let style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        card = elements.create('card', {
            style,
            hidePostalCode: true
        });

        card.mount('#card-element');
    }

    // Stripe
    const paymentType = document.querySelector('#paymentType');
    if (!paymentType) {
        return;
    };
    paymentType.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            // Display Widget
            mountWidget();
        } else {
            card.destroy();
        }
    })


    // Ajax Call
    const paymentForm = document.querySelector('#payment-form');

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(paymentForm);
            let formObject = {};

            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            };

            if (!card) {
                // Axios Call
                postOrder(formObject);
                return;
            }
            // verify Card from Stripe
            stripe.createToken(card).then((result) => {
                formObject.stripeToken = result.token.id;
                postOrder(formObject);
            }).catch((err) => {
                console.log(err);
            });

            
        });
    };
}