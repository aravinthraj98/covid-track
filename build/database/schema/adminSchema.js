"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var adminSchema = new _mongoose.Schema({
  areacode: {
    type: String,
    required: true,
    min: 3
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});
var _default = adminSchema;
exports["default"] = _default;