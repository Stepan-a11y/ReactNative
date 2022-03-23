const userService = require('../service/userService');

class UserController {
    async registration (req, res, next) {
        try {
            const {email, password, name, number} = req.body;
            const userData = await userService.registration(email, password, name, number);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            console.log(e)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            console.log(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            console.log(e)
        }
    }


    async addAuto (req, res, next) {
        try {
            const {email, autoNumber} = req.body;
            const userData = await userService.autoInfo(email, autoNumber);
            return res.json(userData);
        } catch (e) {
            console.log(e)
        }
    }


    async getInfo (req, res, next) {
        try {
            const {carNumber} = req.params;
            const userData = await userService.autoData(carNumber);
            return res.json(userData);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController();