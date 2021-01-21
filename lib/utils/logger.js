"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _default = function _default() {
  return _winston["default"].createLogger({
    level: 'info',
    format: _winston["default"].format.combine(_winston["default"].format.errors({
      stack: true
    }), _winston["default"].format.timestamp(), _winston["default"].format.json()),
    transports: [new _winston["default"].transports.Console()]
  });
};

exports["default"] = _default;