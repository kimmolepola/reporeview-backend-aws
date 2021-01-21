"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _through = _interopRequireDefault(require("through2"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _context = _interopRequireDefault(require("./context"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var context = (0, _context["default"])({
  config: _config["default"]
});
var schema = (0, _schema["default"])();
var logger = context.logger;
var logStream = (0, _through["default"])(function (chunk) {
  logger.info(chunk.toString());
});
var app = (0, _app["default"])({
  schema: schema,
  context: context,
  logStream: logStream,
  config: _config["default"]
});
var _default = app;
/*
const server = http.createServer(app.callback()).listen(config.port);

server.on('listening', () => {
  logger.info(`Server listening to port ${config.port}`);
});
*/

exports["default"] = _default;