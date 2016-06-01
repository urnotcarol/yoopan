var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "heyyoo",
  database: "yoopan"
});

module.exports = connection;
