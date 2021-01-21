"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  type PageInfo {\n    hasNextPage: Boolean!\n    totalCount: Int!\n    startCursor: String\n    endCursor: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;