"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var yup = _interopRequireWildcard(require("yup"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  input AuthorizeInput {\n    username: String!\n    password: String!\n  }\n\n  type AuthorizationPayload {\n    user: User!\n    accessToken: String!\n    expiresAt: DateTime!\n  }\n\n  extend type Mutation {\n    \"\"\"\n    Generates a new access token, if provided credentials (username and password) match any registered user.\n    \"\"\"\n    authorize(credentials: AuthorizeInput): AuthorizationPayload\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var authorizeInputSchema = yup.object().shape({
  username: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim()
});
var resolvers = {
  Mutation: {
    authorize: function () {
      var _authorize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var models, authService, User, normalizedAuthorization, username, password, user, match;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models, authService = _ref.authService;
                User = models.User;
                _context.next = 4;
                return authorizeInputSchema.validate(args.credentials, {
                  stripUnknown: true
                });

              case 4:
                normalizedAuthorization = _context.sent;
                username = normalizedAuthorization.username, password = normalizedAuthorization.password;
                _context.next = 8;
                return User.query().findOne({
                  username: username
                });

              case 8:
                user = _context.sent;

                if (user) {
                  _context.next = 11;
                  break;
                }

                throw new _apolloServer.UserInputError('Invalid username or password');

              case 11:
                _context.next = 13;
                return _bcryptjs["default"].compare(password, user.password);

              case 13:
                match = _context.sent;

                if (match) {
                  _context.next = 16;
                  break;
                }

                throw new _apolloServer.UserInputError('Invalid username or password');

              case 16:
                return _context.abrupt("return", _objectSpread({
                  user: user
                }, authService.createAccessToken(user.id)));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function authorize(_x, _x2, _x3) {
        return _authorize.apply(this, arguments);
      }

      return authorize;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;