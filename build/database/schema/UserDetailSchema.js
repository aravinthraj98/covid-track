"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserDetailSchema = new _mongoose.Schema({
  email: {
    type: String,
    min: 6,
    max: 144,
    unique: true,
    required: true
  },
  address: {
    type: JSON,
    required: true
  },
  noofmembers: {
    type: Number,
    required: true
  },
  familymembers: {
    type: Array,
    required: true
  },
  dailyreport: {
    type: Array
  },
  location: {
    type: Array
  },
  phonenumber: {
    type: Number,
    min: 10
  }
});
var _default = UserDetailSchema;
exports["default"] = _default;