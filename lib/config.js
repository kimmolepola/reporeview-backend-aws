"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: _path["default"].resolve(__dirname, '..', '.env')
});

var _default = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    client: 'sqlite3',
    connection: {
      filename: _path["default"].resolve(__dirname, '..', process.env.DATABASE_FILENAME || 'database.sqlite')
    },
    useNullAsDefault: true
  },
  github: {
    apiUrl: process.env.GITHUB_API_URL,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }
};
exports["default"] = _default;