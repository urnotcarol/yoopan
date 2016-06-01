var express = require("express");
var signup = require("../controllers/signup.js");
var router = express.Router();

router.get("/", signup.displayPage);
router.post("/userSignup", signup.userSignup);

module.exports = router;
