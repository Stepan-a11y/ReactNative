module.exports = class UserDto {
    id;
    email;
    name;
    number;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.number = model.number;
    }
}