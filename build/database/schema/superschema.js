"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var superSchema = new _mongoose.Schema({
  adminid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var _default = superSchema;
exports["default"] = _default;