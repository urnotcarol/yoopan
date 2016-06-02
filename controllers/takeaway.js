var connection = require("./connection.js");
var multer = require("multer");
var utils = require("utility");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function(req, file, cb) {
    cb(null, utils.md5(file.originalname + Math.random()) + Date.now());   //保存文件名 md5(文件名+随机数）+时间
  }
});

exports.displayPage = function(req, res) {
  res.sendfile("views/takeaway.html");
}

exports.uploadStrategy = multer({
  storage: storage
});

exports.upload = function(req, res, next) {
  if(req.file === undefined) {
    res.send(
      "<script type='text/JavaScript'>alert('请选择文件～'); location.href='/takeaway';</script>");
  }
  console.log(req.file);
  var originalName = req.file.originalname; //原始文件名
  var fileName = req.file.filename;
  var size = req.file.size;
  var accessCode = 100000;
  var insertFileSQL = "insert into tempFile (originalName, fileName, size) values ('" +
  utils.base64encode(originalName) + "', '" + fileName + "', " + size + ");";
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
            "<script type='text/JavaScript'>alert('上传成功～您的提取码为 " + accessCode + " 。'); location.href='/takeaway';</script>");
        }
      });
    }
  });
}

exports.displayFile = function(req, res) {
  var accessCode = req.query.accessCode;
  var readFileSQL = "select * from tempFile where accessCode = " + accessCode + ";";
  connection.query(readFileSQL, function(err, rows) {
    if(err) {
      throw err;
    } else if(rows.length === 0) {
      res.send({
        status: 10001,
        message: {},
        data: {}
      });
    } else {
      rows[0].originalName = utils.base64decode(rows[0].originalName);    
      res.send({
        status: 10000,
        message: {},
        data: rows[0]
      });
    }
  });
}

exports.download = function(req, res) {
  var accessCode = req.params["0"];
  var readFileSQL = "select * from tempFile where accessCode = " + accessCode + ";";
  connection.query(readFileSQL, function(err, rows) {
    var fileName = "./public/upload/" + rows[0].fileName;
    res.download(fileName, utils.base64decode(rows[0].originalName));
  });
}
