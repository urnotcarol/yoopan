var connection = require("./connection.js");

exports.displayPage = function(req, res) {
  res.sendfile("views/signup.html");
}

exports.userSignup = function(req, res) {
  var readUserSQL = "select * from user where username = '" + req.body.username + "';"
  connection.query(readUserSQL, function(err, rows) {
    if(err) {
      throw err;
    } else {
      if(rows.length === 0) {
        var insertUserSQL = "insert into user (username, password) values ('" +
        req.body.username + "','" + req.body.password + "');";
        connection.query(insertUserSQL, function(err, rows) {
          if (err) {
            throw err;
          } else {
            res.send({
              status: 10000,
              message: {},
              data: {}
            });
          }
        });
      } else if(rows.length === 1) {
        res.send({
          status: 10001,
          message: {},
          data: {}
        });
      }
    }
  });
}
