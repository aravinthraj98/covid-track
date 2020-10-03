"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserSchema = _interopRequireDefault(require("../schema/UserSchema"));

var User = _mongoose["default"].model('user', _UserSchema["default"]);

var _default = User;
exports["default"] = _default;