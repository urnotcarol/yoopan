var connection = require("./connection.js");
var utils = require("utility");

exports.displayPage = function(req, res) {
  res.sendfile("views/signin.html");
}

exports.userSignin = function(req, res) {
  var readUserSQL = "select * from user where username = '" + req.body.username +
  "' and password = '" + utils.md5(req.body.password) + "';"
  connection.query(readUserSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      if(rows.length === 1) {
        res.send({
          status: 10000,
          message: {},
          data: {}
        });
      } else {
        res.send({
          status: 10001,
          massage: {},
          data: {}
        });
      }
    }
  });
}
