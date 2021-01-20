import { Utils } from "../../config/Utils";
import User from "../../models/User";
import Bcrypt from 'bcrypt';

export class AuthController {
    static login(req, res, next) {
        res.render('auth/login');
    };
    static register(req, res, next) {
        res.render('auth/register');
    };

    static async postRegister(req, res, next) {
        const { name, email, password } = req.body;

        // Validating User
        if (!name || !email || !password) {
            req.flash('error', 'All fields are required');
            req.flash('name', name);
            req.flash('email', email);
            return res.redirect('/register');
        };

        // encrypting Password
        const hashPassword = await Utils.encryptPassword(password);

        // Creating User Structure
        const user = new User({
            name,
            email,
            password: hashPassword
        });

        // Check if email already taken
        User.exists({ email: email }, (err, result) => {
            if (result) {
                req.flash('error', 'Email already taken');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            } else {
                // Saving new User to Database
                user.save().then((user) => {
                    // Login
                    return res.redirect('/');
                }).catch(err => {
                    req.flash('error', 'Something Went Wrong');
                    return res.redirect('/register');
                })
            }
        });

    };
};