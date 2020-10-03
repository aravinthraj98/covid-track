"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _virustestSchema = _interopRequireDefault(require("../schema/virustestSchema"));

var virustest = _mongoose["default"].model("virustest", _virustestSchema["default"]);

var _default = virustest;
exports["default"] = _default;