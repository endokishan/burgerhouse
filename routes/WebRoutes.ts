import { Router } from "express";
import { AdminOrderController } from "../app/http/controllers/admin/OrderControllers";
import { AuthController } from "../app/http/controllers/AuthController";
import { CartController } from "../app/http/controllers/customers/CartController";
import { OrderController } from "../app/http/controllers/customers/OrderController";
import { HomeController } from "../app/http/controllers/HomeController";
import { GuestUser } from "../app/http/middlewares/GuestUser";


export class WebRoutes {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();

        this.postRoutes();

        this.patchRoutes();

        this.deleteRoutes();
    }

    getRoutes() {
        // Home Page
        this.router.get('/', HomeController.home);

        // Login Page
        this.router.get('/login', GuestUser.Guest, AuthController.login);

        // SignUp Page
        this.router.get('/register', GuestUser.Guest, AuthController.register);

        // Customers Cart Page
        this.router.get('/cart', CartController.cart);

        // Customers Order Page
        this.router.get('/customer/orders', GuestUser.Auth, OrderController.index);

        // Admin Routes
        this.router.get('/admin/orders', GuestUser.Auth, AdminOrderController.index);
    };

    postRoutes() {
        // Cart Update
        this.router.post('/update-cart', CartController.update);

        // User Registration
        this.router.post('/register', AuthController.postRegister);

        // User Login
        this.router.post('/login', AuthController.postLogin);

        // Logout
        this.router.post('/logout', AuthController.logout);

        // Customer Orders
        this.router.post('/orders', GuestUser.Auth, OrderController.store)
    };

    patchRoutes() {

    }

    deleteRoutes() {

    }
};

export default new WebRoutes().router;