var connection = require("./connection.js");

exports.displayPage = function(req, res) {
  res.sendfile("views/takeaway.html");
}
