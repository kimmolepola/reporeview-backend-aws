"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.typeDefs = exports.resolvers = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphql = require("graphql");

var _apolloServer = require("apollo-server");

var _dateFns = require("date-fns");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  scalar DateTime\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var isValidDateTime = function isValidDateTime(value) {
  var isSerializable = (0, _dateFns.isDate)(value) || typeof value === 'string' || typeof value === 'number';
  return isSerializable ? (0, _dateFns.isValid)(new Date(value)) : false;
};

var config = {
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' + 'compliant with the `date-time` format outlined in section 5.6 of ' + 'the RFC 3339 profile of the ISO 8601 standard for representation ' + 'of dates and times using the Gregorian calendar.',
  serialize: function serialize(value) {
    if (isValidDateTime(value)) {
      return new Date(value).toISOString();
    }

    throw new TypeError("DateTime can not be serialized from ".concat(JSON.stringify(value)));
  },
  parseValue: function parseValue(value) {
    if (isValidDateTime(value)) {
      return new Date(value);
    }

    throw new TypeError("DateTime can not be parsed from ".concat(JSON.stringify(value)));
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind !== _graphql.Kind.STRING) {
      throw new TypeError("DateTime cannot represent non string type ".concat(String(ast.value != null ? ast.value : null)));
    }

    var value = ast.value;

    if (isValidDateTime(value)) {
      return new Date(value);
    }

    throw new TypeError("DateTime can not be parsed from ".concat(JSON.stringify(value)));
  }
};
var resolvers = {
  DateTime: new _graphql.GraphQLScalarType(config)
};
exports.resolvers = resolvers;
var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var _default = {
  resolvers: resolvers,
  typeDefs: typeDefs
};
exports["default"] = _default;