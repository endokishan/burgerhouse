import Order from "../../../models/Order";

export class AdminOrderController {
    static index(req, res, next) {
        Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).
            populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders');
                }
            });
    };
};