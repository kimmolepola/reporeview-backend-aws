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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var yup = _interopRequireWildcard(require("yup"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  input CreateUserInput {\n    username: String!\n    password: String!\n  }\n\n  extend type Mutation {\n    \"\"\"\n    Creates a new user, if the provided username does not already exist.\n    \"\"\"\n    createUser(user: CreateUserInput): User\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;

var UsernameTakenError = /*#__PURE__*/function (_ApolloError) {
  (0, _inherits2["default"])(UsernameTakenError, _ApolloError);

  var _super = _createSuper(UsernameTakenError);

  function UsernameTakenError(message, properties) {
    (0, _classCallCheck2["default"])(this, UsernameTakenError);
    return _super.call(this, message, 'USERNAME_TAKEN', properties);
  }

  (0, _createClass2["default"])(UsernameTakenError, null, [{
    key: "fromUsername",
    value: function fromUsername(username) {
      return new UsernameTakenError("Username ".concat(username, " is already taken. Choose another username"), {
        username: username
      });
    }
  }]);
  return UsernameTakenError;
}(_apolloServer.ApolloError);

var createUserInputSchema = yup.object().shape({
  username: yup.string().min(1).max(30).lowercase().trim(),
  password: yup.string().min(5).max(50).trim()
});
var resolvers = {
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var models, User, normalizedUser, passwordHash, existingUser, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models;
                User = models.User;
                _context.next = 4;
                return createUserInputSchema.validate(args.user, {
                  stripUnknown: true
                });

              case 4:
                normalizedUser = _context.sent;
                _context.next = 7;
                return _bcryptjs["default"].hash(normalizedUser.password, 10);

              case 7:
                passwordHash = _context.sent;
                _context.next = 10;
                return User.query().findOne({
                  username: normalizedUser.username
                });

              case 10:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 13;
                  break;
                }

                throw UsernameTakenError.fromUsername(normalizedUser.username);

              case 13:
                id = (0, _v["default"])();
                _context.next = 16;
                return User.query().insert(_objectSpread(_objectSpread({}, normalizedUser), {}, {
                  password: passwordHash,
                  id: id
                }));

              case 16:
                return _context.abrupt("return", User.query().findById(id));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUser(_x, _x2, _x3) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;