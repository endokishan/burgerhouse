export class AuthMiddleware {
    static Guest(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/');
        }
    };

    static Auth(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    };

    static Admin(req, res, next) {
        if (req.isAuthenticated() && req.user.role =='admin') {
            return next()
        }
        return res.redirect('/');
    }
};