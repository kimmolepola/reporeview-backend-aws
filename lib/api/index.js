"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _repositories = _interopRequireDefault(require("./repositories"));

var router = new _koaRouter["default"]();
router.use('/repositories', _repositories["default"].routes());
var _default = router;
exports["default"] = _default;