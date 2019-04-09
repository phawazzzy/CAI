var user = require('../models/user');
let courses = require('../models/courses')





exports.homepage = async(req, res) => {
    let free = "";
    let featured = "";
    free = await courses.find({ type: "free" });
    featured = await courses.findOne({ type: "featured" });

    let pagename = "home";

    console.log(free)
    res.render("index", { free, featured, pagename })
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
    res.render("about", { pagename });

};

// exports.courses = (req, res) => {
//     let pagename = "courses";
//     res.render("courses", { pagename })
// }

exports.courses = async(req, res, next) => {
    let doc = ""
    doc = await courses.find({})
    let pagename = "courses";

    res.render("courses", { doc, pagename })

}

// exports.coursepage = async(req, res) => {
//     let idd = req.params.id;
//     let result = "";

//     result = await courses.findOne({ _id: idd });
//     res.render("course", { result })
// }




exports.classroom = (req, res) => {
    let pagename = "classroom";
    res.render("classroom", { pagename })
}

exports.topic = (req, res) => {
    let pagename = "topic";
    res.render("CMS/topic", { pagename })
}


exports.contact = (req, res) => {
    let pagename = "contact";
    res.render("contact", { pagename })
}


exports.summary = (req, res) => {

    let pagename = "summary";
    res.render("summary", { pagename })
}

// exports.coursepage = (req, res) => {
//     let pagename = "coursepage";
//     res.render("course", { pagename })
// }