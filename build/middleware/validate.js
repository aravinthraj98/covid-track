"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("joi"));

var Adminlogin = function Adminlogin(data) {
  var schema = _joi["default"].object({
    areacode: _joi["default"].string().min(5).required(),
    password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
};

module.exports = {
  Adminlogin: Adminlogin
};