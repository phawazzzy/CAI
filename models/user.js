let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);