var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var route = require('./routes/route.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public/'));
app.use(express.static('bower_components/'));


route.setRoutes(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("listening at http://%s:%s", host, port);
});
