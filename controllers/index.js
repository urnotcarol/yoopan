var connection = require("./connection.js");

exports.displayIndex = function(req, res) {
  res.sendfile("views/index.html");
}
