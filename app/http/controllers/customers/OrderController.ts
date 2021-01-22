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
            totalPrice : req.session.cart.totalPrice,
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
        res.render('customers/orders', { orders: orders, moment: moment });
    }
};