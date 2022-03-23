const UserModel = require('../models/user');
const AutoModel = require('../models/auto');
const bcrypt = require('bcryptjs')
const tokenService = require('./tokenService');
const autoService = require('./autoService');
const UserDto = require('../dto/userDto');
const AutoDto = require('../dto/autoDto');

class UserService {
    async registration(email, password, name, number) {
        const tryUser = await UserModel.findOne({email})
        if (tryUser) {
            throw new Error("Такой пользователь уже есть!")
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await UserModel.create({email, password: hashPassword, name, number})
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const loginUser = await UserModel.findOne({email})
        if (!loginUser) {
            throw new Error("Такого пользователя нет в системе!")
        }

       const compPassword = await bcrypt.compare(password, loginUser.password);
       if (!compPassword) {
           throw new Error("Неверный пароль!")
       }
        
        const userDto = new UserDto(loginUser);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh (refreshToken) {
        if(!refreshToken) {
            throw new Error("Не авторизован")
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenDB = await tokenService.searchToken(refreshToken);
        if(!userData || !tokenDB) {
            throw new Error ("Не авторизован")
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}

    }


    async autoInfo (email, autoNumber) {
        const autoUser = await UserModel.findOne({email})
        if (!autoUser) {
            throw new Error("Пользователь не найден")
        }

        const userDto = new UserDto(autoUser);
        await autoService.addAuto(userDto.id, autoNumber);

        return {user: userDto}
    }


    async autoData (carNumber) {
        const userInfo = await AutoModel.findOne({carNumber}).populate('user')
        if (!userInfo) {
            throw new Error("Пользователя с таким авто нет!")
        }

        const autoDto = new AutoDto(userInfo);
        return {userData: autoDto};
    }
}

module.exports = new UserService();