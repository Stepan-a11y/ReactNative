const {Schema, model} = require('mongoose');


const AutoSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    carNumber: {type: String, required: false}
})


module.exports = model('Auto', AutoSchema);