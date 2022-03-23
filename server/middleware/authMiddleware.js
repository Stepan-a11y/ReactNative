const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    try {
        const headerToken = req.headers.authorization;
        if(!headerToken) {
            throw new Error("Не авторизован")
        }

        const accessToken = headerToken.split(' ')[1];
        if(!accessToken) {
            throw new Error("Не авторизован")
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            throw new Error("Не авторизован")
        }

        req.user = userData;
        next();

    } catch (e) {
        console.log(e);
    }
}