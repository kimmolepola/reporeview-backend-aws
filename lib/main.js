"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _through = _interopRequireDefault(require("through2"));

var _app = _interopRequireDefault(require("./app"));

var _context = _interopRequireDefault(require("./context"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _config = _interopRequireDefault(require("./config"));

// import http from 'http';
var serverlessKoa = require('aws-serverless-koa');

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
module.exports = serverlessKoa(app);
/*
const server = http.createServer(app.callback()).listen(config.port);

server.on('listening', () => {
  logger.info(`Server listening to port ${config.port}`);
});
*/