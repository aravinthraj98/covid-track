"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _index = require("./config/index");

var _User = _interopRequireDefault(require("./database/models/User"));

var _UserDetail = _interopRequireDefault(require("./database/models/UserDetail"));

var _admin = _interopRequireDefault(require("./database/models/admin"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index2 = _interopRequireDefault(require("./routes/index"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _env = require("./config/env");

// let date = new Date()
// console.log(date.toLocaleDateString())
// date=date.toLocaleString();
// let date1 =new Date();
// date1.setDate(date1.getDate()-10);
// console.log(date1.toLocaleDateString())
var app = (0, _express["default"])();
app.use('/assets', _express["default"]["static"]('assets')); //src need check

app.set('view engine', 'ejs');
app.set('views', _path["default"].join(__dirname, '../views'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use((0, _expressSession["default"])({
  secret: "login",
  cookie: {
    expires: 60 * 60 * 1000
  } // Approximately Friday, 31 Dec 9999 23:59:59 GMT

}));

if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"]("build"));
  app.set('view engine', 'ejs');
  app.use('/assets', _express["default"]["static"]('assets'));
  app.set('views', _path["default"].join(__dirname, 'views'));
  app.get("*", function (req, res) {
    res.sendfile(_path["default"].resolve(__dirname, "build", index.html));
  });
} // app.get('/login', (req, res) => {
//   res.render('sideNav.ejs');


(0, _index2["default"])(app);
app.use(function (req, res) {
  res.render("error.ejs");
});
app.listen(_env.PORT, function () {
  (0, _index.connectDB)();
  console.log("api running -> http://localhost:".concat(_env.PORT));
});