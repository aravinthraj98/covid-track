"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _UserDetail = _interopRequireDefault(require("../database/models/UserDetail"));

var getuserdetail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var getdetails, temp, oxy, readings, i, read, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _UserDetail["default"].findOne({
              email: email
            });

          case 2:
            getdetails = _context.sent;
            console.log(getdetails.address);
            temp = [];
            oxy = [];
            readings = getdetails.dailyreport;

            for (i in readings) {
              read = JSON.parse(readings[i]);
              temp.push(read.temperature);
              oxy.push(read.oxygen);
            }

            console.log(oxy);
            data = {
              temperature: temp,
              oxygen: oxy,
              people: getdetails.familymembers,
              address: getdetails.address
            };
            return _context.abrupt("return", data);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getuserdetail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getuserdetail;
exports["default"] = _default;