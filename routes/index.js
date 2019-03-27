var express = require('express');
var router = express.Router();
let controller = require("../controllers/frontend");
// let user = require("../models/user")

/* GET home page. */
router.get('/', controller.homepage);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/about', controller.about);
router.get('/courses', controller.courses);




module.exports = router;