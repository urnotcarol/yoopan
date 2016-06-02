var connection = require("./connection.js");
var multer = require("multer");
var utilis = require("utility");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function(req, file, cb) {
    cb(null, utilis.md5(file.originalname + Math.random()) + Date.now());   //保存文件名 md5（文件名+随机数）+时间
  }
});

exports.displayPage = function(req, res) {
  res.sendfile("views/takeaway.html");
}

exports.uploadStrategy = multer({
  storage: storage
});

exports.upload = function(req, res, next) {
  console.log(req.file);
  var originalName = req.file.originalname; //原始文件名
  var fileName = utilis.md5(req.file.originalname + Math.random()) + Date.now();
  var size = req.file.size;
  var accessCode = 100000;
  var insertFileSQL = "insert into tempFile (originalName, fileName, size) values ('" +
  originalName + "', '" + fileName + "', " + size + ");";
  connection.query(insertFileSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      accessCode += rows.insertId;
      var updateFileSQL = "update tempFile set accessCode = " + accessCode + " where id = " + rows.insertId + ";";
      connection.query(updateFileSQL, function(err, rows) {
        if(err) {
          throw err;
        } else {
          res.send(
            "<script type='text/JavaScript'>alert('上传成功～您的提取码为 " + accessCode + " 。'); location.href='/takeaway';</script>"
        );
        }
      });
    }
  });
}
