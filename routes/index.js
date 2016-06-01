var express = require("express");
var index = require("../controllers/index.js");
var router = express.Router();

router.get("/", index.displayIndex);

module.exports = router;
