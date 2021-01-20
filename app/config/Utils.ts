import Bcrypt from 'bcrypt';

export class Utils {
    // Encrypting password
    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                };
            });
        });
    };
};