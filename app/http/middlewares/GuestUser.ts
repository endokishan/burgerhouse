export class GuestUser {
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
};