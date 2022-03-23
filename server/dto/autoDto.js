module.exports = class AutoDto {
    id;
    user_id;
    name;
    number;
    carNumber;

    constructor(model) {
        this.id = model._id;
        this.user_id = model.user._id;
        this.name = model.user.name;
        this.number = model.user.number;
        this.carNumber = model.carNumber;
    }
}