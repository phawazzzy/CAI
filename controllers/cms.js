let user = require('../models/user')
let courses = require('../models/courses')

exports.dashboard = (req, res, next) => {
    let username = req.user.name
    let userEmail = req.user.email

    courses.find({}).then((doc) => {
        if (doc) {
            res.render("CMS/dashboard", { username, userEmail, doc })
        } else {
            res.render("CMS/dashboard")
        }
    })
}



exports.admin_register = (req, res) => {
    res.render("CMS/signup", {})
}

exports.admin_login = (req, res) => {
    res.render("CMS/login", {})
}


exports.topic = (req, res, next) => {
    let username = req.user.name
    let userEmail = req.user.email

    courses.find({}).then((doc) => {
        if (doc) {
            console.log(doc)
            res.render("CMS/topic", { username, userEmail, doc })
        } else {
            res.render("CMS/topic")
        }
    })
}