"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var yup = _interopRequireWildcard(require("yup"));

var _createPaginationQuery = _interopRequireDefault(require("../../utils/createPaginationQuery"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Query {\n    \"\"\"\n    Returns paginated users.\n    \"\"\"\n    users(first: Int, after: String): UserConnection!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var usersArgsSchema = yup.object({
  after: yup.string(),
  first: yup.number().min(1).max(30)["default"](30)
});
var resolvers = {
  Query: {
    users: function () {
      var _users = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var User, normalizedArgs;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                User = _ref.models.User;
                _context.next = 3;
                return usersArgsSchema.validate(args);

              case 3:
                normalizedArgs = _context.sent;
                return _context.abrupt("return", (0, _createPaginationQuery["default"])(function () {
                  return User.query();
                }, {
                  orderColumn: 'createdAt',
                  orderDirection: 'desc',
                  first: normalizedArgs.first,
                  after: normalizedArgs.after
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function users(_x, _x2, _x3) {
        return _users.apply(this, arguments);
      }

      return users;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;