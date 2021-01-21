"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  type Review {\n    id: ID!\n    user: User!\n    repository: Repository!\n    userId: String!\n    repositoryId: String!\n    rating: Int!\n    createdAt: DateTime!\n    text: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Review: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, args, _ref2) {
        var userId, userLoader;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = _ref.userId;
                userLoader = _ref2.dataLoaders.userLoader;
                return _context.abrupt("return", userLoader.load(userId));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function user(_x, _x2, _x3) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    repository: function repository(_ref3, args, _ref4) {
      var repositoryId = _ref3.repositoryId;
      var repositoryLoader = _ref4.dataLoaders.repositoryLoader;
      return repositoryLoader.load(repositoryId);
    }
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;