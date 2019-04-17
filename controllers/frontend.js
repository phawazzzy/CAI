var user = require('../models/user');
let courses = require('../models/courses')

exports.homepage = async(req, res) => {
    let free = "";
    let featured = "";
    free = await courses.find({type: "free"});
    featured = await courses.findOne({type: "featured"});
    let pagename = "home";
    const authenticated = req.isAuthenticated();
    console.log(authenticated)
    res.render("index", {free, featured, pagename, authenticated,})
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
    let pagename = "about"
    const authenticated = req.isAuthenticated();

    res.render("about", {pagename, authenticated });
    
};


exports.courses = async(req, res, next) => {
    let doc = ""
    doc = await courses.find({})
    let pagename ="courses";
    const authenticated = req.isAuthenticated();
    console.log(authenticated)
    res.render("courses", { doc, pagename,authenticated})
}

exports.coursepage = async(req, res) => {
    let idd = req.params.id;
    let result = "";
    result = await courses.findOne({ _id: idd });
   
    let pagename ="coursepage"
    console.log(authenticated)
    res.render("course", { result, authenticated, pagename })
}

exports.test = async(req, res, next) => {
    let doc = ""
    docx = await test.find({})
    let pagename = "test";

    res.render("tests", { doc, pagename })

}

// exports.coursepage = async(req, res) => {
//     let idd = req.params.id;
//     let result = "";

//     result = await courses.findOne({ _id: idd });
//     res.render("course", { result })
// }




exports.classroom = (req, res) => {
    let pagename = "classroom";
    
    const authenticated = req.isAuthenticated();

    res.render("classroom", {pagename, authenticated,})
}

exports.topic = (req, res) => {
    let pagename = "topic";
    const authenticated = req.isAuthenticated();
   
    res.render("CMS/topic", {pagename, authenticated})
}

exports.contact = (req, res) => {
    let pagename = "contact";
    const authenticated = req.isAuthenticated();

    res.render("contact", {pagename, user: req.user , authenticated})
}


exports.summary = (req, res) => {

    let pagename = "summary";
    const authenticated = req.isAuthenticated();
    
    res.render("summary", {pagename, authenticated})
}

exports.coursepage = (req, res) => {
    let pagename = "coursepage";
    const authenticated = req.isAuthenticated();
   
    res.render("course", {pagename, authenticated})
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
