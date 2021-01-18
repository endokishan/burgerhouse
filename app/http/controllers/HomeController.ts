import Menu from "../../models/Menu";

export class HomeController {
    static async home(req, res, next) {
        try {
            const burgerMenu = await Menu.find();
            res.render('home', {burgerMenu:burgerMenu});
        } catch (e) {
            console.log(e)
        }
    };
};