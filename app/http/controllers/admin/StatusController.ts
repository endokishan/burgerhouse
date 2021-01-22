import Order from "../../../models/Order";

export class StatusController {
    static update(req, res, next) {
        Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, {}, (err, data) => {
            if (err) {
                return res.redirect('/admin/orders');
            }
            res.redirect('/admin/orders');
        })
    }
}