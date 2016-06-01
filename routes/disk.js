var express = require("express");
var disk = require("../controllers/disk.js");
var router = express.Router();

router.get("/", disk.displayPage);

module.exports = router;
