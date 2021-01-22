export class CartController {
    static cart(req, res, next) {
        res.render('customers/cart');
    };

    static update(req, res, next) {
        // Cart Structure :
        // let cart = {
        //     items : {
        //         burgerID : { item : burgerObject, Qty : 0},
        //         burgerID : { item : burgerObject, Qty : 0},
        //     },
        //     totalQty : 0,
        //     totalPrice : 0
        // }

        // creating cart structure 1st time if cart structure is not yet present (1st request)
        if (!req.session.cart) {
            req.session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0
            }
        }


        let cart = req.session.cart;
        // check if item does not exist in cart

        if (!cart.items[req.body._id]) {
            cart.items[req.body._id] = {
                item: req.body,
                qty: 1
            }

            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price;
        } else {
            cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price;
        }

        return res.json({
            totalQty: req.session.cart.totalQty,
            itemName: req.body.name,
            item : req.session.cart.items
        });
    };
};