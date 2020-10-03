"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _nodemailer = _interopRequireDefault(require("../../utils/nodemailer"));

var _UserDetail = _interopRequireDefault(require("../../database/models/UserDetail"));

var _getuserdetail = _interopRequireDefault(require("../../services/getuserdetail"));

var _User = _interopRequireDefault(require("../../database/models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _viruscases = _interopRequireDefault(require("../../database/models/viruscases"));

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.session.email && req.cookies.email == req.session.email)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return (0, _getuserdetail["default"])(req.session.email);

          case 3:
            data = _context.sent;
            return _context.abrupt("return", res.render('sideNav.ejs', {
              data: data
            }));

          case 5:
            res.render('index.ejs');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, getuser, ismatch, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            getuser = _context2.sent;

            if (!getuser) {
              _context2.next = 16;
              break;
            }

            _context2.next = 8;
            return _bcrypt["default"].compare(req.body.password, getuser.password);

          case 8:
            ismatch = _context2.sent;

            if (!ismatch) {
              _context2.next = 16;
              break;
            }

            res.cookie("email", email);
            req.session.email = email;
            _context2.next = 14;
            return (0, _getuserdetail["default"])(email);

          case 14:
            data = _context2.sent;
            return _context2.abrupt("return", res.render('sideNav.ejs', {
              data: data
            }));

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.render('index.ejs', {
              data: {
                "msg": "usernamea or password wrong"
              }
            });

          case 22:
            res.render('index.ejs', {
              data: {
                "msg": "username or password wrong"
              }
            });

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/changepassword", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result, email, isuser, last, date, ismail, _date, salt, password;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = Math.random().toString(36).substring(2, 11);
            email = req.body.mail;
            _context3.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            isuser = _context3.sent;

            if (isuser) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.send("not a valid email"));

          case 9:
            last = isuser.password_changedon;

            if (!(String(last).length > 2)) {
              _context3.next = 19;
              break;
            }

            date = new Date();
            date.setDate(date.getDate() - 10);
            date = date.toLocaleDateString();
            date = new Date(date);
            last = new Date(last);

            if (!(date < last)) {
              _context3.next = 19;
              break;
            }

            console.log("hello");
            return _context3.abrupt("return", res.send("password has been changed back few days check mail on ".concat(isuser.password_changedon)));

          case 19:
            ismail = (0, _nodemailer["default"])(req.body.mail, "your new password is  ".concat(result, " change after login"));

            if (!ismail) {
              _context3.next = 38;
              break;
            }

            _context3.prev = 21;
            _date = new Date();
            _date = _date.toLocaleDateString();
            _context3.next = 26;
            return _bcrypt["default"].genSalt(10);

          case 26:
            salt = _context3.sent;
            _context3.next = 29;
            return _bcrypt["default"].hash(result, salt);

          case 29:
            password = _context3.sent;
            _context3.next = 32;
            return _User["default"].findOneAndUpdate({
              email: email
            }, {
              $set: {
                password: password,
                password_changedon: _date
              }
            });

          case 32:
            return _context3.abrupt("return", res.send("password has been sent to respective email"));

          case 35:
            _context3.prev = 35;
            _context3.t0 = _context3["catch"](21);
            console.log("not updata");

          case 38:
            res.send("some error has occured plz try again later");

          case 39:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[21, 35]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/getcases", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var findcase, data, address, i;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            findcase = req.body;
            _context4.prev = 1;
            _context4.next = 4;
            return _viruscases["default"].find(findcase);

          case 4:
            data = _context4.sent;
            address = [];

            for (i in data) {
              address.push(data[i].address);
            } // console.log(address);


            return _context4.abrupt("return", res.send(address));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

          case 13:
            res.send("some error occurred");

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.clearCookie("email");
  res.render("index.ejs");
});
var _default = router;
exports["default"] = _default;