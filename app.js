var express = require("express");
var bodyParser = require('body-parser');
var multer = require("multer");
var mysql = require("mysql");
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public/'));
app.use(express.static('bower_components/'));

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

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + "/views/signin.html")
})

app.get("/signup", function(req, res) {
  res.sendFile(__dirname + "/views/signup.html")
})

app.get("signup/userSignup", function(req, res) {
  res.send({
    status: 10000,
    massage: {}
  });
});

app.get("/disk", function(req, res) {
  res.sendFile(__dirname + "/views/disk.html")
})

app.get("/takeaway", function(req, res) {
  res.sendFile(__dirname + "/views/takeaway.html")
})

app.post("/takeaway/upload", upload.array("resource", 3), function (req, res, next) {
  console.log(req.files[0].originalname);
  res.redirect("/takeaway");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("listening at http://%s:%s", host, port);
});
