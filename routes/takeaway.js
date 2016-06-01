var express = require("express");
var multer = require("multer");
var takeaway = require("../controllers/takeaway.js");
var router = express.Router();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
});

var upload = multer({
  storage: storage
});

router.get("/", takeaway.displayPage);
router.post("/upload", upload.array("resource", 3), function (req, res, next) {
  console.log(req.files[0].originalname);
  res.redirect("/takeaway");
});

module.exports = router;
