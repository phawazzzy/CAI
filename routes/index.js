var express = require('express');
var router = express.Router();
let controller = require("../controllers/frontend");


/* GET home page. */
router.get('/', controller.homepage);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/about', controller.about);
router.get('/courses', controller.courses);
router.get('/contact', controller.contact);
router.get('/news', controller.news);




module.exports = router;