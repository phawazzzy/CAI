exports.homepage = (req, res) => {
    res.render("index", {})
};

exports.login = (req, res) => {
    res.render("login", {})
};

exports.register = (req, res) => {
    // res.send("i am register and i am working")
    res.render("register", {})

}
exports.about = (req, res) => {
    res.render("about", {});
};

exports.courses = (req, res) => {
    res.render("courses", {})
}

exports.contact = (req, res) => {
    res.render("contact", {})
}

exports.news = (req, res) => {
    res.render("news", {})
}