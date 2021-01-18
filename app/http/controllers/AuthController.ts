export class AuthController {
    static login(req, res, next) {
        res.render('auth/login');
    };
    static register(req, res, next) {
        res.render('auth/register');
    };
};