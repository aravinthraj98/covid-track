"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _admin2 = _interopRequireDefault(require("../../database/models/admin"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _official = _interopRequireDefault(require("../../database/models/official"));

var router = _express["default"].Router();

router.post("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _admin, adminfind, ispassword;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _admin = {
              adminid: req.body.adminid
            };
            _context.next = 4;
            return _official["default"].findOne(_admin);

          case 4:
            adminfind = _context.sent;
            _context.next = 7;
            return _bcrypt["default"].compare(req.body.password, adminfind.password);

          case 7:
            ispassword = _context.sent;

            if (!ispassword) {
              _context.next = 14;
              break;
            }

            req.session.admin = req.body.adminid;
            res.cookie("admin", req.body.adminid);
            return _context.abrupt("return", res.render("superAdminhome.ejs"));

          case 14:
            return _context.abrupt("return", res.render("admin.ejs", {
              msg: {
                "text": "username or password mismatch"
              }
            }));

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.render("admin.ejs", {
              msg: {
                "text": "someerror occured"
              }
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.cookies.admin && req.session.admin == req.cookies.areacode)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.render("superAdminhome.ejs"));

          case 2:
            return _context2.abrupt("return", res.render("admin.ejs", {
              msg: {
                "text": "session expired login again"
              }
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/add", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var areacode, isadmin, salt, password, newarea;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            areacode = req.body.area;
            _context3.next = 3;
            return _admin2["default"].findOne({
              areacode: areacode
            });

          case 3:
            isadmin = _context3.sent;

            if (isadmin) {
              _context3.next = 24;
              break;
            }

            _context3.prev = 5;
            _context3.next = 8;
            return _bcrypt["default"].genSalt(10);

          case 8:
            salt = _context3.sent;
            _context3.next = 11;
            return _bcrypt["default"].hash(req.body.password, salt);

          case 11:
            password = _context3.sent;
            // console.log(password);
            newarea = {
              areacode: areacode,
              password: password
            };
            _context3.next = 15;
            return _admin2["default"].insertMany(newarea);

          case 15:
            res.send(true);
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](5);
            console.log(_context3.t0);
            res.send("some error occured please try again later");

          case 22:
            _context3.next = 25;
            break;

          case 24:
            res.send("admin already registered");

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 18]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/delete", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var areacode, isadmin;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            areacode = req.body.areacode;
            _context4.prev = 1;
            _context4.next = 4;
            return _admin2["default"].findOne({
              areacode: areacode
            });

          case 4:
            isadmin = _context4.sent;

            if (isadmin) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.send("area not found"));

          case 7:
            _context4.next = 9;
            return _admin2["default"].findOneAndDelete({
              areacode: areacode
            });

          case 9:
            return _context4.abrupt("return", res.send(true));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

          case 15:
            return _context4.abrupt("return", res.end("some error occured"));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/changepassword", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var areacode, isadmin, salt, password;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            areacode = req.body.areacode;
            _context5.prev = 1;
            _context5.next = 4;
            return _admin2["default"].findOne({
              areacode: areacode
            });

          case 4:
            isadmin = _context5.sent;

            if (isadmin) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.send("area not found"));

          case 7:
            _context5.next = 9;
            return _bcrypt["default"].genSalt(10);

          case 9:
            salt = _context5.sent;
            _context5.next = 12;
            return _bcrypt["default"].hash(req.body.password, salt);

          case 12:
            password = _context5.sent;
            _context5.next = 15;
            return _admin2["default"].findOneAndUpdate({
              areacode: areacode
            }, {
              $set: {
                password: password
              }
            });

          case 15:
            res.send(true);
            _context5.next = 21;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);

          case 21:
            res.send("some error has been occured");

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 18]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;