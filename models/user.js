let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Scheme;

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

    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema);