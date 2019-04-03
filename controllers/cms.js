exports.dashboard = (req, res) => {
    res.render("CMS/dashboard")
}

exports.add_topic = (req, res) => {
    res.render("CMS/add_topic", {})
}

exports.admin_register = (req, res) => {
    res.render("CMS/signup", {})
}

exports.admin_login = (req, res) => {
    res.render("CMS/login", {})
}