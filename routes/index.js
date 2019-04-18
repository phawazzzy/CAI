var express = require('express');
var router = express.Router();
let passport = require('passport')
let controller = require("../controllers/frontend");
let cms_controller = require("../controllers/cms");
var multer = require('multer');
const async = require("async");
var courses = require("../models/courses")
var test = require("../models/test")
const fs = require('fs');
let result = require("../models/result")


const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require("path")
let showError = require("../config/errorHandler");
let user = require('../models/user');


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
    folder: "csip",
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
const upload = multer({ storage: cloudStorage, fileFilter: checkFileType("images") });
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
            // pageData.image = `uploads/${req.file.filename}`
            pageData.publicid = req.file.public_id;
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
    .get(async function(req, res) {

        try {
            let test = ""
            test = await courses.find({})


            let username = req.user.name
            let userEmail = req.user.email
            console.log(test)
            res.render("CMS/add_test", { username, userEmail, test })
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
            pageData.publicid = req.file.public_id;
            // pageData.image = `uploads/${req.file.filename}`
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
    if (req.isAuthenticated() && req.user.role == "student") {
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


// THE STUDENT TEST ROUTE
router.get("/dashboard/testresult", function(req, res, next) {
        let username = req.user.name
        let userEmail = req.user.email
        let pagename = "test";

        // // let username = req.user.name;
        // let result = "";
        // Result = await result.find({});

        res.render("CMS/result", { userEmail, username, pagename })
    })
    // 

// test section
router.get("/newTest", isLoggedIn, (req, res, next) => {
    let studentname = req.user.name;
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8', (err, data) => {
        if (err) throw err;
    });
    var jsonContent = JSON.parse(readQuiz);
    var titles = [];
    for (var i = 0; i < jsonContent.length; i++) {
        titles[i] = jsonContent[i]["title"];
    }
    res.render("newTest", { titles: titles, studentname })

})
router.post("/dashboard/testresult/post", function(req, res, next) {
    let resultData = {
        name: req.body.username,
        score: req.body.userscore,
        topic: req.body.topic
    };

    result.create(resultData).then((result) => {
        console.log(result)
        res.redirect('/')
    });

})



router.get("/add_new_test", (req, res, next) => {
    let username = req.user.name;
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var titles = [];
    for (var i = 0; i < jsonContent.length; i++) {
        titles[i] = jsonContent[i]["title"];
    }
    res.render("CMS/addNewTest", { titles: titles })

})

router.get('/,/quiz', function(req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var titles = [];
    for (var i = 0; i < jsonContent.length; i++) {
        titles[i] = jsonContent[i]["title"];
    }
    res.send(JSON.stringify(titles));
});

router.post('/quiz', function(req, res) {
    var sentQuiz = req.body;
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    if (jsonContent.length > 0) {
        sentQuiz["id"] = jsonContent[jsonContent.length - 1]["id"] + 1;
    }
    jsonContent.push(sentQuiz);

    var jsonString = JSON.stringify(jsonContent);
    fs.writeFileSync("data/allQuizzes.json", jsonString, (err) => {
        if (err) {
            console.log(err)
            alert("cant post quiz")
        } else {
            let success = req.flash("success", "new quiz has been posted")
            alert("posted quiz")

            // swal({
            //     title: "success",
            //     text: "new quiz has been succesfully created",
            //     icon: "success"
            // })

            res.send("created", { success });
        }
    });


});

router.get('/quiz/:id', function(req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var targetQuiz;;
    for (var i = 0; i < jsonContent.length; i++) {
        if (jsonContent[i]["id"] === parseInt(req.params.id)) {
            targetQuiz = jsonContent[i];
            break;
        }
    }
    res.send(targetQuiz);
});

router.put('/quiz/:id', function(req, res) {
    var sentQuiz = req.body;
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    for (var i = 0; i < jsonContent.length; i++) {
        if (jsonContent[i]["id"] === parseInt(req.params.id)) {
            jsonContent[i] = sentQuiz;
            break;
        }
    }

    var jsonString = JSON.stringify(jsonContent);
    fs.writeFile("data/allQuizzes.json", jsonString, (err) => {
        if (err) {
            console.log(err)
            alert("cant post quiz")
        } else {
            res.send("updated");
        }

    });


});

router.delete('/quiz/:id', function(req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    for (var i = 0; i < jsonContent.length; i++) {
        if (jsonContent[i]["id"] === parseInt(req.params.id)) {
            jsonContent.splice(i, 1);
            break;
        }
    }
    var jsonString = JSON.stringify(jsonContent);
    fs.writeFile("data/allQuizzes.json", jsonString, (err) => {
        if (err) {
            console.log(err)
            alert("cant delete quiz")
        } else {
            res.send("deleted");
        }
    });
});

router.get('/reset', function(req, res) {
    var readIn = fs.readFileSync("data/defaultallquizzes.json", 'utf8');
    // var readInAdded = fs.readFileSync("data/allQuizzes.json", 'utf8');
    // fs.writeFile("data/allQuizzesRevert.json", readInAdded);
    fs.writeFile("data/allQuizzes.json", readIn);
    res.send("default quizzes restored");
});

router.get('/revert', function(req, res) {
    var readIn = fs.readFileSync("data/allQuizzesRevert.json", 'utf8');
    fs.writeFile("data/allQuizzes.json", readIn);
    res.send("reverted");
});

router.get('/users', function(req, res) {
    var readUsers = fs.readFileSync("data/users.json", 'utf8');
    res.send(readUsers);
});

router.post('/users', function(req, res) {
    var jsonString = JSON.stringify(req.body);
    fs.writeFile("data/users.json", jsonString);
    res.send(req.body);
});

router.get('/titles', function(req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var titles = "[";
    for (var i = 0; i < jsonContent.length; i++) {
        if (i < jsonContent.length - 1)
            titles += "\"" + jsonContent[i]["title"] + "\"" + ", ";
        else
            titles += "\"" + jsonContent[i]["title"] + "\"";
    }
    titles += "]";
    res.send(titles);
});

router.get('/titlesandids', function(req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var titles = [];
    for (var i = 0; i < jsonContent.length; i++) {
        titles[i] = jsonContent[i]["title"];
        titles[jsonContent.length + i] = jsonContent[i]["id"];
    }
    res.send(JSON.stringify(titles));
});


module.exports = router;