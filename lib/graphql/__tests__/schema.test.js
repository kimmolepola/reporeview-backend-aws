"use strict";

var _schema = _interopRequireDefault(require("../schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('createSchema', function () {
  it('creates schema without errors', function () {
    (0, _schema["default"])();
    expect(true).toBe(true);
  });
});