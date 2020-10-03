"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserDetailSchema = _interopRequireDefault(require("../schema/UserDetailSchema"));

var UserDetail = _mongoose["default"].model('userdetail', _UserDetailSchema["default"]);

var _default = UserDetail;
exports["default"] = _default;