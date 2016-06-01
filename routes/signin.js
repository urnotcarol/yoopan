var express = require("express");
var signin = require("../controllers/signin.js");
var router = express.Router();

router.get("/", signin.displayPage);
router.post("userSignin", signin.userSignin);

module.exports = router;
