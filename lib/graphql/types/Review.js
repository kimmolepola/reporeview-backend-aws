"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Review {\n    id: ID!\n    user: User!\n    repository: Repository!\n    userId: String!\n    repositoryId: String!\n    rating: Int!\n    createdAt: DateTime!\n    text: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Review: {
    user: function () {
      var _user = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, args, _ref2) {
        var userId, userLoader;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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