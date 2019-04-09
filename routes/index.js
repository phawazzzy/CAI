var express = require('express');
var router = express.Router();
let passport = require('passport')
let controller = require("../controllers/frontend");
let cms_controller = require("../controllers/cms");
var multer = require('multer');
const async = require("async");
var courses = require("../models/courses")
var test = require("../models/test")

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require("path")
let showError = require("../config/errorHandler");




var user = require('../models/user');


/* GET home page. */
router.get('/', controller.homepage);
// router.get('/', (req, res, next) => {
//     res.render('index')
// })
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/admin_register', cms_controller.admin_register);
router.get('/admin_login', cms_controller.admin_login);
router.get('/about', controller.about);
router.get('/courses', isLoggedIn, controller.courses);
router.get('/topic', adminLoggedIn, cms_controller.topic);
router.get('/contact', isLoggedIn, controller.contact)
    // router.get('/add_topic', adminLoggedIn, cms_controller.add_topic);
router.get('/classroom', controller.classroom);
router.get("/dashboard", adminLoggedIn, cms_controller.dashboard);
router.get('/summary', controller.summary)
    // router.get('/course/:id', controller.coursepage)
    // router.get("/taketest", isLoggedIn, controller.takeTest)





// HANDLE IMAGES
// -----
// CLOUDINARY STORAGE
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, //"dyieekcre"
    api_key: process.env.CLOUD_KEY, //"732513327822775"
    api_secret: process.env.CLOUD_SECRET //"HzlXLGG447c9m92q6a8vhWoiR-c"
});
const cloudStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "citse",
});

// folder storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.filename + '_' + Date.now() + path.extname(file.originalname))
    }
});

// FILE CHECK
function checkFileType(type) {
    return function(req, file, cb) {
        // Allowed ext
        let filetypes;
        if (type == "pdf") {
            filetypes = /pdf/;
        } else if (type == "images") {
            filetypes = /jpeg|jpg|png|gif/;
        }

        // Get ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error(`Error Occured: Upload ${type.toUpperCase()} Only!`));
        }
    };
}
// Multer execute
const upload = multer({ storage: storage, fileFilter: checkFileType("images") });
const uploadFile = multer({ storage: cloudStorage, fileFilter: checkFileType("pdf") });

async function getOldImage(req, res, next) {
    oldImage = await courses.find({});
    return next();
}

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

router.post('/register/admin', passport.authenticate('local.adminSignup', {
    successRedirect: "/dashboard",
    failureRedirect: "/admin_register",
    failueFlash: true
}));

router.post('/login/admin', passport.authenticate('local.adminLogin', {
    successRedirect: "/dashboard",
    failureRedirect: "/admin_login",
    failueFlash: true
}));

// route for add topic so help me God

router.route("/add_topic")
    .all(adminLoggedIn)
    .get(function(req, res) {
        try {

            let username = req.user.name
            let userEmail = req.user.email
            res.render("CMS/add_topic", { username, userEmail })
        } catch (err) {
            showError(req, "GET", "add_topic", err);
            res.redirect("/dashboard");
        }
    })
    .post(upload.single("image"), async function(req, res) {
        let pageData = {
            topic_title: req.body.topic_title,
            summary: req.body.summary,
            content: req.body.content,
            author: req.body.author,
            category: req.body.category,
            duration: req.body.duration,
            type: req.body.type,
        };
        if (req.file) {
            pageData.image = `uploads/${req.file.filename}`
                // pageData.publicid = req.file.public_id;
        }

        try {
            await courses.create(pageData);
            req.flash("success", "course Creation Successful!");
        } catch (err) {
            showError(req, "POST", "/add_topic", err);
        }

        res.redirect("/topic");
    });

// add test route

router.route("/add_test")
    .all(adminLoggedIn)
    .get(function(req, res) {
        try {
            // let admin = user.find({ role: "admin" })
            let username = req.user.name
            let userEmail = req.user.email
            res.render("CMS/add_test", { username, userEmail })
        } catch (err) {
            showError(req, "GET", "add_test", err);
            res.redirect("/dashboard");
        }
    })
    .post(upload.single("image"), async function(req, res) {
        let testData = {
            topic_title: req.body.topic_title,
            question: req.body.question,
            choices: req.body.chioces,
            correct: req.body.correct,

        };
        if (req.file) {
            pageData.image = `uploads/${req.file.filename}`
                // pageData.publicid = req.file.public_id;
        }

        try {
            await test.create(testData);
            console.log(testData)
            req.flash("success", "test Creation Successful!");
        } catch (err) {
            showError(req, "POST", "/add_test", err);
        }

        res.redirect("/add_test");
    });

// one page render for the courses

// router.get("/lessons", async function(req, res, next) {
//     let result = ""
//     result = await Lecture.find({})
//     res.render("lessons", { result })
// })

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect("/login");
}

function adminLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "admin") {
        return next()
    }

    res.redirect("/admin_login");
}


router.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/")
})

router.get("/adminLogout", function(req, res) {
    req.logout()
    res.redirect("/admin_login");
})

router.get("/courses/:id", async function(req, res, next) {
    idd = req.params.id;
    iddd = req.params.id;

    let result = "";
    let quiz = ""
    result = await courses.findOne({ _id: idd })
    let title = result.topic_title;
    quiz = await test.find({ topic_title: title })
    console.log(quiz)
    let pagename = "courses";

    res.render("course", { result, quiz, pagename })
})

// take test route
router.get('/tests/historyofcomputers', function(req, res, next) {
    test.find({}).then(function(result) {
        console.log(result)
        res.render("taketest", { result });
    })
})




module.exports = router;