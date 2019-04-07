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


exports.courses = async(req, res, next) => {
    let doc = ""
    doc = await courses.find({})
    pagename = courses;
    res.render("courses", { doc, pagename, isLoggedIn:req.isAuthenticated() })
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





// exports.renderPage = function(req, res) {
//     let navIndex = req.path.substr(1);
//     if (typeof f[navIndex] === "undefined") {
//         (async() => {
//             const news = await allNews;

//             res.render("frontend/404", { activeNav: "", navIndex, doc: news });
//         })();
//     } else {
//         let thisPage = f[navIndex].data;
//         let activeNav = f[navIndex].nav;
//         (async() => {
//             let pageData = Page.find({ tag: thisPage });

//             const [dt, news, ptn] =
//             await Promise.all(
//                 [pageData, allNews, allPartners]
//             );

//             res.render("frontend/template", { content: dt[0], doc: news, title: navIndex.replace(/(-)+/gi, " ").toUpperCase(), activeNav, partners: ptn });
//         })();
//     }
// };
