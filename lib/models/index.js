"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.bindModels = void 0;

var _User = _interopRequireDefault(require("./User"));

var _Repository = _interopRequireDefault(require("./Repository"));

var _Review = _interopRequireDefault(require("./Review"));

var bindModels = function bindModels(knex) {
  return {
    User: _User["default"].bindKnex(knex),
    Repository: _Repository["default"].bindKnex(knex),
    Review: _Review["default"].bindKnex(knex)
  };
};

exports.bindModels = bindModels;
var _default = bindModels;
exports["default"] = _default;