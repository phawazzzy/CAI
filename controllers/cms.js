let user = require('../models/user')
let courses = require('../models/courses')

exports.dashboard = (req, res, next) => {
    let username = req.user.name
    let userEmail = req.user.email
    let pagename = "dashboard"

    courses.find({}).then((doc) => {
        if (doc) {
            res.render("CMS/dashboard", { username, userEmail, doc, pagename })
        } else {
            res.render("CMS/dashboard")
        }
    })
}



exports.admin_register = (req, res) => {
    res.render("CMS/signup", {})
}

exports.admin_login = (req, res) => {
    let loginError = req.flash('loginError');
    let passwordError = req.flash('passwordError')
    res.render("CMS/login", { loginError, passwordError })
}


exports.topic = (req, res, next) => {
    let username = req.user.name
    let userEmail = req.user.email
    let pagename = "topic"

    courses.find({}).then((doc) => {
        if (doc) {
            console.log(doc)
            res.render("CMS/topic", { username, userEmail, doc, pagename })
        } else {
            res.render("CMS/topic")
        }
    })
}