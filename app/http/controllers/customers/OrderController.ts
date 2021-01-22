import Order from "../../../models/Order";
import moment from 'moment';

export class OrderController {
    static store(req, res, next) {
        // Validating Request
        const { phone, address } = req.body;
        if (!phone || !address) {
            req.flash('error', 'All Fields are Required');
            return res.redirect('/cart');
        };

        const order = new Order({
            customerId: req.user._id,
            items: req.session.cart.items,
            phone,
            address
        });

        order.save().then(result => {
            req.flash('success', 'Order Placed Successfully');
            delete req.session.cart;
            return res.redirect('/customer/orders');
        }).catch(err => {
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/cart');
        });
    };

    static async index(req, res, next) {
        const orders = await Order.find({ customerId: req.user._id },
            null, { sort: { 'createdAt': -1 } });
        res.header('Cache-Control', 'no-store, private, no-cache, must-revalidate, mx-stale=0, post-check=0, pre-check=0');
        res.render('customers/orders', { orders: orders, moment: moment });
    }
};