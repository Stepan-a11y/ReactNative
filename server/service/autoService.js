const AutoModel = require('../models/auto');

class AutoService {
    async addAuto(userId, autoNumber) {
        const autoData = await AutoModel.findOne({user: userId})

        if (autoData) {
            autoData.carNumber = autoNumber
            return autoData.save();
        }

        const auto = await AutoModel.create({user: userId, carNumber: autoNumber})

        return auto;
    }
}

module.exports = new AutoService();