"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GithubRepositoryNotFoundError = void 0;

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _apolloServer = require("apollo-server");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var oneHour = 1000 * 60 * 60;
var HTTP_CLIENT_ERROR = Symbol();

var isNotFoundError = function isNotFoundError(error) {
  return (0, _lodash.get)(error[HTTP_CLIENT_ERROR], 'response.status') === 404;
};

var GithubError = /*#__PURE__*/function (_ApolloError) {
  _inherits(GithubError, _ApolloError);

  var _super = _createSuper(GithubError);

  function GithubError(message, properties) {
    _classCallCheck(this, GithubError);

    return _super.call(this, message, 'GITHUB_API_FAILURE', properties);
  }

  _createClass(GithubError, null, [{
    key: "fromHttpClientError",
    value: function fromHttpClientError(error) {
      var githubError = new GithubError('GitHub API request failed', {
        response: (0, _lodash.pick)(error.response, ['status', 'statusText', 'headers', 'data'])
      });
      githubError[HTTP_CLIENT_ERROR] = error;
      return githubError;
    }
  }]);

  return GithubError;
}(_apolloServer.ApolloError);

var GithubRepositoryNotFoundError = /*#__PURE__*/function (_ApolloError2) {
  _inherits(GithubRepositoryNotFoundError, _ApolloError2);

  var _super2 = _createSuper(GithubRepositoryNotFoundError);

  function GithubRepositoryNotFoundError(message, properties) {
    _classCallCheck(this, GithubRepositoryNotFoundError);

    return _super2.call(this, message, 'GITHUB_REPOSITORY_NOT_FOUND', properties);
  }

  _createClass(GithubRepositoryNotFoundError, null, [{
    key: "fromNames",
    value: function fromNames(ownerName, repositoryName) {
      return new GithubRepositoryNotFoundError("GitHub repository ".concat(repositoryName, " owned by ").concat(ownerName, " does not exists"), {
        ownerName: ownerName,
        repositoryName: repositoryName
      });
    }
  }]);

  return GithubRepositoryNotFoundError;
}(_apolloServer.ApolloError);

exports.GithubRepositoryNotFoundError = GithubRepositoryNotFoundError;

var GithubClient = /*#__PURE__*/function () {
  function GithubClient(_ref) {
    var httpClient = _ref.httpClient,
        _ref$cacheMaxAge = _ref.cacheMaxAge,
        cacheMaxAge = _ref$cacheMaxAge === void 0 ? oneHour : _ref$cacheMaxAge,
        clientId = _ref.clientId,
        clientSecret = _ref.clientSecret;

    _classCallCheck(this, GithubClient);

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.httpClient = httpClient;
    this.cache = new _lruCache["default"]({
      max: 100,
      maxAge: cacheMaxAge
    });
  }

  _createClass(GithubClient, [{
    key: "getAuth",
    value: function getAuth() {
      return this.clientId && this.clientSecret ? {
        username: this.clientId,
        password: this.clientSecret
      } : undefined;
    }
  }, {
    key: "getRequest",
    value: function () {
      var _getRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var options,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.prev = 1;
                _context.next = 4;
                return this.httpClient.get(url, _objectSpread(_objectSpread({}, options), {}, {
                  auth: this.getAuth()
                }));

              case 4:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                throw GithubError.fromHttpClientError(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function getRequest(_x) {
        return _getRequest.apply(this, arguments);
      }

      return getRequest;
    }()
  }, {
    key: "getRequestWithCache",
    value: function () {
      var _getRequestWithCache = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cacheKey, url, options) {
        var cachedPromise, _yield$cachedPromise, data, promise, _yield$promise, _data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cachedPromise = this.cache.get(cacheKey);

                if (!cachedPromise) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return cachedPromise;

              case 4:
                _yield$cachedPromise = _context2.sent;
                data = _yield$cachedPromise.data;
                return _context2.abrupt("return", data);

              case 7:
                promise = this.getRequest(url, options);
                this.cache.set(cacheKey, promise);
                _context2.prev = 9;
                _context2.next = 12;
                return promise;

              case 12:
                _yield$promise = _context2.sent;
                _data = _yield$promise.data;
                return _context2.abrupt("return", _data);

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](9);
                this.cache.del(cacheKey);
                throw _context2.t0;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 17]]);
      }));

      function getRequestWithCache(_x2, _x3, _x4) {
        return _getRequestWithCache.apply(this, arguments);
      }

      return getRequestWithCache;
    }()
  }, {
    key: "getRepository",
    value: function () {
      var _getRepository = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, repository) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.getRequestWithCache("repository.".concat(username, ".").concat(repository), "/repos/".concat(username, "/").concat(repository));

              case 3:
                data = _context3.sent;
                return _context3.abrupt("return", data);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                if (!isNotFoundError(_context3.t0)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", null);

              case 11:
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getRepository(_x5, _x6) {
        return _getRepository.apply(this, arguments);
      }

      return getRepository;
    }()
  }]);

  return GithubClient;
}();

var createGithubClient = function createGithubClient(options) {
  return new GithubClient(options);
};

var _default = createGithubClient;
exports["default"] = _default;