"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaMorgan = _interopRequireDefault(require("koa-morgan"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _apolloServerKoa = require("apollo-server-koa");

var _yup = require("yup");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _errors = require("./errors");

var _authService = _interopRequireDefault(require("./utils/authService"));

var _dataLoaders = _interopRequireDefault(require("./utils/dataLoaders"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var errorHandler = function errorHandler() {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var normalizedError;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              _context.next = 11;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              normalizedError = _context.t0 instanceof _errors.ApplicationError ? _context.t0 : new _errors.ApplicationError('Something went wrong');
              ctx.status = normalizedError.status || 500;
              ctx.body = normalizedError;
              ctx.logger.error(_context.t0, {
                path: ctx.request.path
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var createApolloErrorFormatter = function createApolloErrorFormatter(logger) {
  return function (error) {
    logger.error(error);
    var originalError = error.originalError;
    var isGraphQLError = !(originalError instanceof Error);
    var normalizedError = new _apolloServerKoa.ApolloError('Something went wrong', 'INTERNAL_SERVER_ERROR');

    if (originalError instanceof _yup.ValidationError) {
      normalizedError = (0, _apolloServerKoa.toApolloError)(error, 'BAD_USER_INPUT');
    } else if (error.originalError instanceof _apolloServerKoa.ApolloError || isGraphQLError) {
      normalizedError = error;
    }

    return normalizedError;
  };
};

var _default = function _default() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      logStream = _ref2.logStream,
      _context2 = _ref2.context,
      schema = _ref2.schema,
      config = _ref2.config;

  var app = new _koa["default"]();
  var apolloServer = new _apolloServerKoa.ApolloServer({
    schema: schema,
    playground: true,
    introspection: true,
    formatError: createApolloErrorFormatter(_context2.logger),
    context: function context(_ref3) {
      var ctx = _ref3.ctx;
      var authorization = ctx.request.get('authorization');
      var accessToken = authorization ? authorization.split(' ')[1] : undefined;
      return _objectSpread(_objectSpread({}, _context2), {}, {
        authService: (0, _authService["default"])({
          accessToken: accessToken,
          jwtSecret: config.jwtSecret
        }),
        dataLoaders: (0, _dataLoaders["default"])({
          models: _context2.models
        })
      });
    }
  });
  app.context = Object.assign(app.context, _context2);
  app.use((0, _koaBodyparser["default"])());
  app.use(errorHandler());

  if (logStream) {
    app.use((0, _koaMorgan["default"])('combined', {
      stream: logStream
    }));
  }

  app.use( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              ctx.dataLoaders = (0, _dataLoaders["default"])({
                models: _context2.models
              });
              _context3.next = 3;
              return next();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  app.use((0, _cors["default"])());
  var apiRouter = new _koaRouter["default"]();
  apiRouter.use('/api', _api["default"].routes());
  app.use(apiRouter.routes());
  apolloServer.applyMiddleware({
    app: app
  });
  app.use(function (ctx) {
    throw new _errors.NotFoundError("The path \"".concat(ctx.request.path, "\" is not found"));
  });
  return app;
};

exports["default"] = _default;