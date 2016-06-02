var express = require("express");
var takeaway = require("../controllers/takeaway.js");
var router = express.Router();

router.get("/", takeaway.displayPage);
router.post("/upload", takeaway.uploadStrategy.single("resource"), takeaway.upload);
router.get("/displayFile", takeaway.displayFile);
router.get("/download/*", takeaway.download);

module.exports = router;
