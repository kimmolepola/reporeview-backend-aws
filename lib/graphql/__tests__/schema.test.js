"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _schema = _interopRequireDefault(require("../schema"));

describe('createSchema', function () {
  it('creates schema without errors', function () {
    (0, _schema["default"])();
    expect(true).toBe(true);
  });
});