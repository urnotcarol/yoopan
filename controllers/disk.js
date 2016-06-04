var connection = require("./connection.js");
var multer = require("multer");
var utils = require("utility");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/user_upload");
  },
  filename: function(req, file, cb) {
    cb(null, utils.md5(file.originalname + Math.random()) + Date.now());   //保存文件名 md5(文件名+随机数）+时间
  }
});

exports.uploadStrategy = multer({
  storage: storage
});

exports.displayPage = function(req, res) {
  res.sendfile("views/disk.html");
}

exports.displayFile = function(req, res) {
  var username = req.query.username;
  var readUserSQL = "select * from user where username = '" + username + "';";
  connection.query(readUserSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      var readFileSQL = "select * from file where userid = " + rows[0].id + ";";
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
          rows.map(function(elem) {
            return elem.originalName = utils.base64decode(elem.originalName);
          })
          res.send({
            status: 10000,
            message: {},
            data: rows
          });
        }
      });
    }
  });
}

exports.upload = function(req, res) {
  var regx = /username=(\w{6,12});/;
  var username = regx.exec(req.rawHeaders[25])[1];
  var readUserSQL = "select * from user where username = '" + username + "';";
  connection.query(readUserSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      if(req.file === undefined) {
        res.send(
          "<script type='text/JavaScript'>alert('请选择文件～'); location.href='/disk';</script>");
      } else {
        var originalName = req.file.originalname; //原始文件名
        var fileName = req.file.filename;
        var size = req.file.size;
        var insertFileSQL = "insert into file (userid, originalName, fileName, size) values (" + rows[0].id + ", '" +
        utils.base64encode(originalName) + "', '" + fileName + "', " + size + ");";
        connection.query(insertFileSQL, function(err, rows) {
          if(err) {
            throw err;
          } else {
            res.send(
            "<script type='text/JavaScript'>alert('上传成功～');location.href='/disk';</script>");
          }
        });
      }
    }
  });
}

exports.download = function(req, res) {
  var fileId = req.params["0"];
  var readFileSQL = "select * from file where id = " + fileId + ";";
  connection.query(readFileSQL, function(err, rows) {
    var fileName = "./public/user_upload/" + rows[0].fileName;
    res.download(fileName, utils.base64decode(rows[0].originalName));
  });
}

exports.delete = function(req, res) {
  var fileId = req.body.fileId;
  var deleteFileSQL = "delete from file where id = " + fileId + ";";
  connection.query(deleteFileSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      res.send({
        status: 10000,
        message: {},
        data: {}
      });
    }
  });
}
