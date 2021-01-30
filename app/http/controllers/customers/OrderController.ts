import Order from "../../../models/Order";
require('dotenv').config();
import moment from 'moment';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export class OrderController {
    static store(req, res, next) {
        // Validating Request
        const { phone, address, stripeToken, paymentType } = req.body;
        if (!phone || !address) {
            return res.status(422).json({ message: 'All Fields are Required' });
        };

        const order = new Order({
            customerId: req.user._id,
            items: req.session.cart.items,
            totalPrice: req.session.cart.totalPrice,
            phone,
            address
        });

        order.save().then(result => {
            Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                // req.flash('success', 'Order placed successfully')

                // Stripe payment
                if (paymentType === 'card') {
                    stripe.charges.create({
                        amount: req.session.cart.totalPrice * 100,
                        source: stripeToken,
                        currency: 'inr',
                        description: `Pizza order: ${placedOrder._id}`
                    }).then(() => {
                        placedOrder.updateOne({ paymentStatus: true, paymentType: paymentType }).then((updatedOrder) => {
                            // Emit
                            const eventEmitter = req.app.get('eventEmitter')
                            eventEmitter.emit('orderPlaced', updatedOrder)
                            delete req.session.cart
                            return res.json({ message: 'Payment successful, Order placed successfully' });
                        }).catch((err) => {
                            return res.json({ message: 'Order Placed, Stripe Failed' });
                        })

                    }).catch((err) => {
                        delete req.session.cart
                        return res.json({ message: 'Order Placed but payment failed, You can pay at delivery time' });
                    })
                } else {
                    // Emit
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    delete req.session.cart
                    return res.json({ message: 'Order placed succesfully' });
                }
            })
        }).catch(err => {
            return res.status(500).json({ message: 'Something went wrong' });
        })
    };

    static async index(req, res, next) {
        const orders = await Order.find({ customerId: req.user._id },
            null, { sort: { 'createdAt': -1 } });
        res.render('customers/orders', { orders: orders, moment: moment });
    }

    static async show(req, res) {
        const order = await Order.findById(req.params.id);
        // Authorize Order
        if (req.user._id.toString() === order.customerId.toString()) {
            return res.render('customers/singleOrder', { order });
        }
        return res.redirect('/');
    };
};