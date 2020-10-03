"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("./api/admin"));

var _user = _interopRequireDefault(require("./api/user"));

var _superadmin = _interopRequireDefault(require("./api/superadmin"));

var _default = function _default(app) {
  app.get("/", function (req, res) {
    res.redirect("/api/user");
  });
  app.use("/api/admin", _admin["default"]), app.use("/api/user", _user["default"]), app.use("/api/official", _superadmin["default"]);
};

exports["default"] = _default;