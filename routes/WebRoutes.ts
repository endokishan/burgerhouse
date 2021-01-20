import { Router } from "express";
import { AuthController } from "../app/http/controllers/AuthController";
import { CartController } from "../app/http/controllers/customers/CartController";
import { HomeController } from "../app/http/controllers/HomeController";


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
        this.router.get('/login', AuthController.login);

        // SignUp Page
        this.router.get('/register', AuthController.register);

        // Customers Cart Page
        this.router.get('/cart', CartController.cart);
    };

    postRoutes() {
        // Cart Update
        this.router.post('/update-cart', CartController.update);

        // User Registration
        this.router.post('/register', AuthController.postRegister);
    };

    patchRoutes() {

    }

    deleteRoutes() {

    }
};

export default new WebRoutes().router;