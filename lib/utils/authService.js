"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var oneWeek = 1000 * 60 * 60 * 24 * 7;
var subject = 'accessToken';

var AuthService = /*#__PURE__*/function () {
  function AuthService(_ref) {
    var accessToken = _ref.accessToken,
        jwtSecret = _ref.jwtSecret;

    _classCallCheck(this, AuthService);

    this.jwtSecret = jwtSecret;
    this.accessToken = accessToken;
  }

  _createClass(AuthService, [{
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