var express = require("express");
var disk = require("../controllers/disk.js");
var router = express.Router();

router.get("/", disk.displayPage);
router.get("/file", disk.displayFile);
router.post("/upload", disk.uploadStrategy.single("resource"), disk.upload);
router.get("/download/*", disk.download);
router.delete("/delete", disk.delete);

module.exports = router;
