"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validate = require("../../middleware/validate");

var _UserDetail = _interopRequireDefault(require("../../database/models/UserDetail"));

var _admin = _interopRequireDefault(require("../../database/models/admin"));

var _User = _interopRequireDefault(require("../../database/models/User"));

var _virustest = _interopRequireDefault(require("../../database/models/virustest"));

var _viruscases = _interopRequireDefault(require("../../database/models/viruscases"));

var _nodemailer = _interopRequireDefault(require("../../utils/nodemailer"));

var router = _express["default"].Router();

var temp_level = 99;
var oxy_level = 95;
router.get("/update", function (req, res) {
  if (!req.cookies.areacode || !req.session.areacode == req.cookies.areacode) return res.render("admin.ejs");
  return res.render("adminUpdate.ejs");
});
router.post("/find", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, finduser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.prev = 1;
            _context.next = 4;
            return _UserDetail["default"].findOne({
              email: email
            });

          case 4:
            finduser = _context.sent;

            if (!finduser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send(finduser));

          case 7:
            return _context.abrupt("return", res.send("no details found"));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 13:
            return _context.abrupt("return", res.send("some error found"));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/update", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, dailyreports, check, dailyreport, isupdate, i, report, newcase, ispresent;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            dailyreports = req.body;
            check = dailyreports["dailyreport[]"]; // console.log(check);
            // console.log(email);

            dailyreport = check;
            _context2.prev = 4;
            _context2.next = 7;
            return _UserDetail["default"].findOneAndUpdate({
              email: email
            }, {
              $set: {
                dailyreport: dailyreport
              }
            });

          case 7:
            isupdate = _context2.sent;
            _context2.t0 = _regenerator["default"].keys(dailyreport);

          case 9:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 22;
              break;
            }

            i = _context2.t1.value;
            report = JSON.parse(dailyreport[i]);

            if (!(report.temperature > temp_level || report.oxygen < oxy_level)) {
              _context2.next = 20;
              break;
            }

            newcase = {
              name: isupdate.familymembers[i],
              address: isupdate.address,
              email: isupdate.email,
              area: isupdate.address.area
            };
            _context2.next = 16;
            return _virustest["default"].findOne(newcase);

          case 16:
            ispresent = _context2.sent;

            if (ispresent) {
              _context2.next = 20;
              break;
            }

            _context2.next = 20;
            return _virustest["default"].insertMany(newcase);

          case 20:
            _context2.next = 9;
            break;

          case 22:
            res.send("success");
            _context2.next = 28;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t2 = _context2["catch"](4);
            return _context2.abrupt("return", res.send(_context2.t2 + " error"));

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 25]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/", function (req, res) {
  if (req.cookies.areacode && req.session.areacode == req.cookies.areacode) return res.render("adminAdd.ejs"); //    console.log(req.session.areacode)

  res.render('admin.ejs');
});
router.post("/add", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, email, salt, create_password, password, userlog, detail, userfind, text, isuser, isuserdetail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!req.cookies.areacode || !req.session.areacode == req.cookies.areacode)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.send("your session has expired please login again"));

          case 2:
            // console.log(req.cookies);
            user = req.body; // console.log(user);

            email = user.email;
            _context3.next = 6;
            return _bcrypt["default"].genSalt(10);

          case 6:
            salt = _context3.sent;
            create_password = "CT_" + email;
            _context3.next = 10;
            return _bcrypt["default"].hash(create_password, salt);

          case 10:
            password = _context3.sent;
            userlog = {
              email: email,
              password: password
            };
            detail = {
              email: email,
              address: {
                dno: user.dno,
                street: user.street,
                area: user.area,
                city: user.city,
                zip: user.zip,
                state: user.state
              },
              phonenumber: user.phonenumber,
              location: user["location[]"],
              noofmembers: user.noofmembers,
              familymembers: user["total[]"]
            }; // console.log(detail);
            // console.log(email);

            _context3.next = 15;
            return _UserDetail["default"].findOne({
              email: email
            });

          case 15:
            userfind = _context3.sent;

            if (!userfind) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.send("user already present"));

          case 18:
            _context3.prev = 18;
            text = "Welcome to covid track application your family has been registerd and your\n \npassword is ".concat(create_password, " you can change your password after login and also check your your profile whether your details are correct if not than complaint via the same app in \n complaint section");
            _context3.next = 22;
            return (0, _nodemailer["default"])(email, text);

          case 22:
            _context3.next = 24;
            return _User["default"].insertMany(userlog);

          case 24:
            isuser = _context3.sent;
            _context3.next = 27;
            return _UserDetail["default"].insertMany(detail);

          case 27:
            isuserdetail = _context3.sent;

            if (!(isuser && isuserdetail)) {
              _context3.next = 30;
              break;
            }

            return _context3.abrupt("return", res.send(true));

          case 30:
            return _context3.abrupt("return", res.send("some error has been occured"));

          case 33:
            _context3.prev = 33;
            _context3.t0 = _context3["catch"](18);
            console.log(_context3.t0);

          case 36:
            res.send("some error has been occured try again later");

          case 37:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[18, 33]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var Admin_validation, adminLog, findadmin, checkpassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            Admin_validation = (0, _validate.Adminlogin)(req.body);

            if (!Admin_validation.error) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.render('admin.ejs', {
              data: {
                msg: Admin_validation.error.message
              }
            }));

          case 3:
            _context4.prev = 3;
            adminLog = {
              areacode: req.body.areacode
            };
            _context4.next = 7;
            return _admin["default"].findOne(adminLog);

          case 7:
            findadmin = _context4.sent;

            if (!findadmin) {
              _context4.next = 21;
              break;
            }

            _context4.next = 11;
            return _bcrypt["default"].compare(req.body.password, findadmin.password);

          case 11:
            checkpassword = _context4.sent;

            if (!checkpassword) {
              _context4.next = 18;
              break;
            }

            req.session.areacode = req.body.areacode;
            res.cookie("areacode", req.body.areacode);
            return _context4.abrupt("return", res.render('adminAdd.ejs'));

          case 18:
            return _context4.abrupt("return", res.render('admin.ejs', {
              data: {
                msg: 'password mismatch'
              }
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            return _context4.abrupt("return", res.render('admin.ejs', {
              data: {
                msg: 'username name not found'
              }
            }));

          case 22:
            _context4.next = 27;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);

          case 27:
            res.send(req.body);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 24]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.clearCookie("areacode");
  res.render("admin.ejs");
});
router.post("/getcases", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var area, cases;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            area = req.cookies.areacode;
            _context5.next = 3;
            return _virustest["default"].find({
              area: area
            });

          case 3:
            cases = _context5.sent;
            res.send(cases);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/testreport", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _id, ispositive, deletes, newcase, text, ispresent;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = req.body._id;
            ispositive = req.body.positive;
            _context6.prev = 2;
            _context6.next = 5;
            return _virustest["default"].findByIdAndDelete({
              _id: _id
            });

          case 5:
            deletes = _context6.sent;

            if (!ispositive) {
              _context6.next = 17;
              break;
            }

            newcase = {
              name: deletes.name,
              email: deletes.email,
              street: deletes.address.street,
              area: deletes.area,
              address: deletes.address
            };
            text = newcase.name + " has been tested as positive our frontline workers will reach you soon please be under quarantine";
            _context6.next = 11;
            return (0, _nodemailer["default"])(newcase.email, text);

          case 11:
            _context6.next = 13;
            return _viruscases["default"].findOne(newcase);

          case 13:
            ispresent = _context6.sent;

            if (ispresent) {
              _context6.next = 17;
              break;
            }

            _context6.next = 17;
            return _viruscases["default"].insertMany(newcase);

          case 17:
            //  console.log(_id);
            res.send(true);
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            console.log(_context6.t0);
            res.send("someerror occurred");

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;