"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = require("joi");

var _mongoose = require("mongoose");

var virustest = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: JSON,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  }
});
var _default = virustest;
exports["default"] = _default;