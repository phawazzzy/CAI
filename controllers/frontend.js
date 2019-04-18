var user = require("../models/user");
let courses = require("../models/courses");

exports.homepage = async (req, res) => {
  let free = "";
  let featured = "";
  free = await courses.find({ type: "free" });
  featured = await courses.findOne({ type: "featured" });
  let pagename = "home";
  const authenticated = req.isAuthenticated();
  console.log(authenticated);

  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("index", { free, featured, pagename, authenticated, username, userEmail });
};

exports.login = (req, res) => {
  let loginError = req.flash("loginError");
  let passwordError = req.flash("passwordError");
  res.render("login", { loginError, passwordError });
};

exports.register = (req, res) => {
  let existence = req.flash("userExist");
  res.render("register", { existence });
};

exports.about = (req, res) => {
  let pagename = "about";
  const authenticated = req.isAuthenticated();
 
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("about", { pagename, authenticated, username, userEmail });
};

exports.courses = async (req, res, next) => {
  let doc = "";
  doc = await courses.find({});
  let pagename = "courses";
  const authenticated = req.isAuthenticated();
  
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("courses", { doc, pagename, authenticated, userEmail, username });
};

exports.coursepage = async (req, res) => {
  let idd = req.params.id;
  let result = "";
  result = await courses.findOne({ _id: idd });
  let pagename = "coursepage";
  
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("course", { result, authenticated, pagename, username, userEmail });
};

exports.test = async (req, res, next) => {
  let doc = "";
  docx = await test.find({});
  let pagename = "test";
  const authenticated = req.isAuthenticated();

  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("tests", { doc, authenticated, pagename, username, userEmail });
};

// exports.coursepage = async(req, res) => {
//     let idd = req.params.id;
//     let result = "";

//     result = await courses.findOne({ _id: idd });
//     res.render("course", { result })
// }

exports.classroom = (req, res) => {
  let pagename = "classroom";

  const authenticated = req.isAuthenticated();

  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("classroom", { pagename, authenticated, username, userEmail });
};

exports.topic = (req, res) => {
  let pagename = "topic";
  const authenticated = req.isAuthenticated();
   
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("CMS/topic", { pagename, authenticated, username, userEmail });
};

exports.contact = (req, res) => {
  let pagename = "contact";
  const authenticated = req.isAuthenticated();

  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("contact", { pagename, user: req.user, authenticated, username, userEmail });
};

exports.summary = (req, res) => {
  let pagename = "summary";
  const authenticated = req.isAuthenticated();
  
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("summary", { pagename, authenticated, username, userEmail });
};

exports.coursepage = (req, res) => {
  let pagename = "coursepage";
  const authenticated = req.isAuthenticated();
   
  var Username = function() {
    if (authenticated) {
      let username = req.user.name;
      return username;
    } else {
        let username = ""
        return username;
    }
    
  };

  var UserEmail = function() {
    if (authenticated) {
      let userEmail = req.user.email;
      return userEmail;
    } else {
        let userEmail = ""
        return userEmail;
    }
    
  };
  
  username = Username()
  userEmail = UserEmail()

  res.render("course", { pagename, authenticated, username, userEmail });
};

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
