"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db_connection = exports.PORT = void 0;

require("dotenv/config");

var PORT = process.env.PORT || 8080;
exports.PORT = PORT;
var db_connection = process.env.db_connection;
exports.db_connection = db_connection;