var mysql = require("mysql");
var connection;
// app.all("*", function(res, req, next) {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "heyyoo",
    database: "yoopan"
  });
//   connection.connect(function(err) {
//     next();
//   });
// });
module.exports = connection;
