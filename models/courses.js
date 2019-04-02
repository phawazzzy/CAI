let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({

    topic_title: {
        type: String,
    },
    author: { type: String },

    image: { type: String },
    content: { type: String },
    createdDate: {
        type: Date,
        default: Date.now()
    },


});

module.exports = mongoose.model('courses', courseSchema);