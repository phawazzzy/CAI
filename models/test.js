let mongoose = require("mongoose");

let Schema = mongoose.Schema;


let testSchema = new Schema({
    topic_title: String,
    question: String,
    choices: Array,
    correct: Number,
})

module.exports = mongoose.model("test", testSchema)