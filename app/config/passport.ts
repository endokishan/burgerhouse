import passport_local from 'passport-local';
import Bcrypt from 'bcrypt';
import User from '../models/User';

const LocalStrategy = passport_local.Strategy;

export class PassportInit {
    static init(Passport) {
        Passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            // Login 
            // Check if Email Exist
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No User with this Email' });
            } else {
                Bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        return done(null, user, { message: 'Logged in succesfully..' });
                    }
                    return done(null, false, { message: 'Wrong email or password' });
                }).catch(err => {
                    return done(null, false, { message: 'Something Went Wrong' });
                });
            };
        }));

        Passport.serializeUser((user, done) => {
            done(null, user._id);
        });

        Passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user)
            })
        })
    };
};