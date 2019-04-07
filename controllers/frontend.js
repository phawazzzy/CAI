var user = require('../models/user')
let courses = require('../models/courses')




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

exports.courses = async(req, res, next) => {
    let doc = ""
    doc = await courses.find({})
    res.render("courses", { doc })
}

exports.coursepage = async(req, res) => {
    let idd = req.params.id;
    let result = "";

    result = await courses.findOne({ _id: idd });
    res.render("course", { result })
}

// router.get("/lessons", async function(req, res, next){
//     let result = ""
//    result = await Lecture.find({})
//     res.render("lessons", {result})
//   })

// router.get("/lessons/:id", async function(req, res, next){
//     let idd = req.params.id;
//     let result = "";

//     result = await Lecture.findOne({link: idd});  
//     res.render("template", {result})        
// })


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