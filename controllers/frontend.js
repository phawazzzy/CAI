var user = require('../models/user');
let courses = require('../models/courses')





exports.homepage = async (req, res) => {
    let free = "";
    let featured = "";
    free = await courses.find({type: "free"});
    featured = await courses.findOne({type: "featured"});

    let pagename = "home";

    console.log(free)
    res.render("index", {free, featured, pagename, isLoggedIn:req.isAuthenticated()})
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
    let pagename = "about";
    res.render("about", {pagename, isLoggedIn:req.isAuthenticated()});
    
};

exports.courses = (req, res) => {
    let pagename = "courses";
    res.render("courses", {pagename, isLoggedIn:req.isAuthenticated()})
}


exports.classroom = (req, res) => {
    let pagename = "classroom";
    res.render("classroom", {pagename, isLoggedIn:req.isAuthenticated()})
}

exports.topic = (req, res) => {
    let pagename = "topic";
    res.render("CMS/topic", {pagename, isLoggedIn:req.isAuthenticated()})
}

exports.contact = (req, res) => {
    let pagename = "contact";
    res.render("contact", {pagename, user: req.user , isLoggedIn:req.isAuthenticated()})
    console.log(req.isAuthenticated())
}


exports.summary = (req, res) => {
    let pagename = "summary";
    res.render("summary", {pagename, isLoggedIn:req.isAuthenticated()})
}

exports.coursepage = (req, res) => {
    let pagename = "coursepage";
    res.render("course", {pagename, isLoggedIn:req.isAuthenticated()})
}