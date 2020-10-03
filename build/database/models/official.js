"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _superschema = _interopRequireDefault(require("../schema/superschema"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var official = _mongoose["default"].model("superadmin", _superschema["default"]);

var _default = official;
exports["default"] = _default;