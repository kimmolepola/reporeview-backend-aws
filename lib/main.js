"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _through = _interopRequireDefault(require("through2"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _context2 = _interopRequireDefault(require("./context"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _config = _interopRequireDefault(require("./config"));

var context = (0, _context2["default"])({
  config: _config["default"]
});
var schema = (0, _schema["default"])();
var logger = context.logger;
var logStream = (0, _through["default"])(function (chunk) {
  logger.info(chunk.toString());
});
var appx = (0, _app["default"])({
  schema: schema,
  context: context,
  logStream: logStream,
  config: _config["default"]
});

var app = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(event, context) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("EVENT: \n" + JSON.stringify(event, null, 2));
            return _context.abrupt("return", context.logStreamName);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function app(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = app;
/*
const server = http.createServer(app.callback()).listen(config.port);

server.on('listening', () => {
  logger.info(`Server listening to port ${config.port}`);
});
*/

exports["default"] = _default;