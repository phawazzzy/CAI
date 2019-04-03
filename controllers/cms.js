let user = require('../models/user')

exports.dashboard = (req, res) => {
    // let role = req.user.role
    user.find({ role: "admin" }).then((result) => {
            if (result) {
                console.log(result)
                res.render("CMS/dashboard", { result })
            } else {
                res.render("CMS/dashboard", {})
            }
        })
        // res.render("CMS/dashboard")
}

exports.add_topic = (req, res) => {
    // let role = req.user.role
    user.find({ role: "admin" }).then((result) => {
        if (result) {
            console.log(result)
            res.render("CMS/add_topic", { result })
        } else {
            res.render("CMS/add_topic", {})
        }
    })
}


exports.admin_register = (req, res) => {
    res.render("CMS/signup", {})
}

exports.admin_login = (req, res) => {
    res.render("CMS/login", {})
}

exports.topic = (req, res) => {
    user.find({ role: "admin" }).then((result) => {
            if (result) {
                console.log(result)
                res.render("CMS/topic", { result })
            } else {
                res.render("CMS/topic", {})
            }
        })
        // res.render("CMS/topic", {})
}