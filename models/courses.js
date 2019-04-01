let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({

    topic_title: {
        type: String,
    },
    image: { type: String },
    content: { type: String },
    author: { type: String },
    createdDate: {
        type: Date,
        default: Date.now()
    },


});