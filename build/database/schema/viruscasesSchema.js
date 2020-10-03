"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Viruscases = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    "default": "*******"
  },
  email: {
    type: String,
    required: true,
    "default": ""
  },
  street: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  address: {
    type: JSON,
    required: true
  }
});
var _default = Viruscases;
exports["default"] = _default;