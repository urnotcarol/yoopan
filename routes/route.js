exports.setRoutes = function(app) {
  app.use("/", require("./index.js"));
  app.use("/signup", require("./signup.js"));
  app.use("/signin", require("./signin.js"));
  app.use("/disk", require("./disk.js"));
  app.use("/takeaway", require("./takeaway"));
}
