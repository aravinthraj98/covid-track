"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _adminSchema = _interopRequireDefault(require("../schema/adminSchema"));

var Admin = _mongoose["default"].model('admin', _adminSchema["default"]);

var _default = Admin;
exports["default"] = _default;