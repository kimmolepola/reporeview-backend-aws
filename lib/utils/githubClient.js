"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GithubRepositoryNotFoundError = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _apolloServer = require("apollo-server");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var oneHour = 1000 * 60 * 60;
var HTTP_CLIENT_ERROR = Symbol();

var isNotFoundError = function isNotFoundError(error) {
  return (0, _lodash.get)(error[HTTP_CLIENT_ERROR], 'response.status') === 404;
};

var GithubError = /*#__PURE__*/function (_ApolloError) {
  (0, _inherits2["default"])(GithubError, _ApolloError);

  var _super = _createSuper(GithubError);

  function GithubError(message, properties) {
    (0, _classCallCheck2["default"])(this, GithubError);
    return _super.call(this, message, 'GITHUB_API_FAILURE', properties);
  }

  (0, _createClass2["default"])(GithubError, null, [{
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
  (0, _inherits2["default"])(GithubRepositoryNotFoundError, _ApolloError2);

  var _super2 = _createSuper(GithubRepositoryNotFoundError);

  function GithubRepositoryNotFoundError(message, properties) {
    (0, _classCallCheck2["default"])(this, GithubRepositoryNotFoundError);
    return _super2.call(this, message, 'GITHUB_REPOSITORY_NOT_FOUND', properties);
  }

  (0, _createClass2["default"])(GithubRepositoryNotFoundError, null, [{
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
    (0, _classCallCheck2["default"])(this, GithubClient);
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.httpClient = httpClient;
    this.cache = new _lruCache["default"]({
      max: 100,
      maxAge: cacheMaxAge
    });
  }

  (0, _createClass2["default"])(GithubClient, [{
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
      var _getRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
        var options,
            response,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
      var _getRequestWithCache = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(cacheKey, url, options) {
        var cachedPromise, _yield$cachedPromise, data, promise, _yield$promise, _data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
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
      var _getRepository = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username, repository) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
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