let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({

    topic_title: {
        type: String,
    },
    author: { type: String },

    image: { type: String },
    summary: { type: String },
    content: { type: String },
    category: { type: String },
    id: { type: String },
    imageId: { type: String },
    type: { type: String },
    duration: { type: String },
    createdDate: {
        type: Date,
        default: Date.now()
    },


});

module.exports = mongoose.model('courses', courseSchema);