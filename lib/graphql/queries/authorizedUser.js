"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    \"\"\"\n    Returns the authorized user.\n    \"\"\"\n    authorizedUser: User\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Query: {
    authorizedUser: function authorizedUser(obj, args, _ref) {
      var userLoader = _ref.dataLoaders.userLoader,
          authService = _ref.authService;
      var userId = authService.getUserId();

      if (!userId) {
        return null;
      }

      return userLoader.load(userId);
    }
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;