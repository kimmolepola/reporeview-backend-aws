"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _knex = _interopRequireDefault(require("knex"));

var _objection = require("objection");

var _logger = _interopRequireDefault(require("./utils/logger"));

var _githubClient = _interopRequireDefault(require("./utils/githubClient"));

var _models = _interopRequireDefault(require("./models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createContext = function createContext(_ref) {
  var config = _ref.config;
  var db = (0, _knex["default"])(_objectSpread(_objectSpread({}, config.database), (0, _objection.knexSnakeCaseMappers)()));
  return {
    db: db,
    models: (0, _models["default"])(db),
    logger: (0, _logger["default"])(),
    githubClient: (0, _githubClient["default"])({
      httpClient: _axios["default"].create({
        baseURL: config.github.apiUrl
      }),
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret
    })
  };
};

var _default = createContext;
exports["default"] = _default;