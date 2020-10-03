"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    min: 6,
    max: 144,
    unique: true,
    required: true
  },
  password: {
    type: String,
    min: 6,
    required: true
  },
  password_changedon: {
    type: Date
  }
});
var _default = UserSchema;
exports["default"] = _default;