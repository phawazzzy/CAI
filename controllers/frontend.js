var user = require('../models/user');



exports.homepage = (req, res) => {
    res.render("index", {})
};

exports.login = (req, res) => {
    let loginError = req.flash('loginError');
    let passwordError = req.flash('passwordError')
    res.render("login", { loginError, passwordError })
};

exports.register = (req, res) => {
    let existence = req.flash('userExist')
    res.render("register", { existence })

}
exports.about = (req, res) => {
    res.render("about", {});
};

exports.courses = (req, res) => {
    res.render("courses", {})
}


exports.classroom = (req, res) => {
    res.render("classroom", {})
}

exports.topic = (req, res) => {
    res.render("CMS/topic", {})
}

exports.contact = (req, res) => {
    res.render("contact", {})
}

exports.news = (req, res) => {
    res.render("news", {})
}

exports.summary = (req, res) => {
    res.render("summary", {})
}