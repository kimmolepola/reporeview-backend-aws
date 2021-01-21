"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

var oneWeek = 1000 * 60 * 60 * 24 * 7;
var subject = 'accessToken';

var AuthService = /*#__PURE__*/function () {
  function AuthService(_ref) {
    var accessToken = _ref.accessToken,
        jwtSecret = _ref.jwtSecret;
    (0, _classCallCheck2["default"])(this, AuthService);
    this.jwtSecret = jwtSecret;
    this.accessToken = accessToken;
  }

  (0, _createClass2["default"])(AuthService, [{
    key: "getUserId",
    value: function getUserId() {
      if (!this.accessToken) {
        return null;
      }

      var tokenPayload;

      try {
        tokenPayload = _jsonwebtoken["default"].verify(this.accessToken, this.jwtSecret, {
          subject: subject
        });
      } catch (e) {
        return null;
      }

      return tokenPayload.userId;
    }
  }, {
    key: "createAccessToken",
    value: function createAccessToken(userId) {
      return {
        accessToken: _jsonwebtoken["default"].sign({
          userId: userId
        }, this.jwtSecret, {
          expiresIn: '7d',
          subject: subject
        }),
        expiresAt: new Date(Date.now() + oneWeek)
      };
    }
  }, {
    key: "assertIsAuthorized",
    value: function assertIsAuthorized() {
      var userId = this.getUserId();

      if (!userId) {
        throw new _apolloServer.AuthenticationError('Access token is invalid or expired');
      }

      return userId;
    }
  }]);
  return AuthService;
}();

var createAuthService = function createAuthService(options) {
  return new AuthService(options);
};

var _default = createAuthService;
exports["default"] = _default;