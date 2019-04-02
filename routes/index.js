var express = require('express');
var router = express.Router();
let passport = require('passport')
let controller = require("../controllers/frontend");
let cms_controller = require("../controllers/cms");

var user = require('../models/user');


/* GET home page. */
router.get('/', controller.homepage);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/admin_register', cms_controller.admin_register);
router.get('/admin_login', cms_controller.admin_login)
router.get('/about', controller.about);
router.get('/courses', isLoggedIn, controller.courses);
router.get('/topic', controller.topic)
router.get('/add_topic', cms_controller.add_topic)




router.post('/register/students', passport.authenticate('local.signup', {
    successRedirect: "/courses",
    failureRedirect: "/register",
    failueFlash: true
}));

router.post('/login/student', passport.authenticate('local.login', {
    successRedirect: "/courses",
    failureRedirect: "/login",
    failueFlash: true
}));



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect("/login");
}

router.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/")
})




module.exports = router;