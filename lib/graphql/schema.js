"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

var _lodash = require("lodash");

var _Repository = _interopRequireDefault(require("./types/Repository"));

var _repository = _interopRequireDefault(require("./queries/repository"));

var _User = _interopRequireDefault(require("./types/User"));

var _createUser = _interopRequireDefault(require("./mutations/createUser"));

var _authorize = _interopRequireDefault(require("./mutations/authorize"));

var _users = _interopRequireDefault(require("./queries/users"));

var _authorizedUser = _interopRequireDefault(require("./queries/authorizedUser"));

var _repositories = _interopRequireDefault(require("./queries/repositories"));

var _PageInfo = _interopRequireDefault(require("./types/PageInfo"));

var _RepositoryConnection = _interopRequireDefault(require("./types/RepositoryConnection"));

var _OrderDirection = _interopRequireDefault(require("./enums/OrderDirection"));

var _createReview = _interopRequireDefault(require("./mutations/createReview"));

var _Review = _interopRequireDefault(require("./types/Review"));

var _ReviewConnection = _interopRequireDefault(require("./types/ReviewConnection"));

var _UserConnection = _interopRequireDefault(require("./types/UserConnection"));

var _deleteReview = _interopRequireDefault(require("./mutations/deleteReview"));

var _DateTime = _interopRequireDefault(require("./scalars/DateTime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    root: String\n  }\n\n  type Mutation {\n    root: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootTypeDefs = (0, _apolloServer.gql)(_templateObject());
var typeDefs = [rootTypeDefs, _DateTime["default"].typeDefs, _Repository["default"].typeDefs, _repository["default"].typeDefs, _User["default"].typeDefs, _createUser["default"].typeDefs, _authorize["default"].typeDefs, _users["default"].typeDefs, _authorizedUser["default"].typeDefs, _repositories["default"].typeDefs, _PageInfo["default"].typeDefs, _RepositoryConnection["default"].typeDefs, _OrderDirection["default"].typeDefs, _createReview["default"].typeDefs, _Review["default"].typeDefs, _ReviewConnection["default"].typeDefs, _UserConnection["default"].typeDefs, _deleteReview["default"].typeDefs];
var resolvers = (0, _lodash.merge)(_DateTime["default"].resolvers, _Repository["default"].resolvers, _repository["default"].resolvers, _User["default"].resolvers, _createUser["default"].resolvers, _authorize["default"].resolvers, _users["default"].resolvers, _authorizedUser["default"].resolvers, _repositories["default"].resolvers, _PageInfo["default"].resolvers, _RepositoryConnection["default"].resolvers, _OrderDirection["default"].resolvers, _createReview["default"].resolvers, _Review["default"].resolvers, _ReviewConnection["default"].resolvers, _UserConnection["default"].resolvers, _deleteReview["default"].resolvers);

var createSchema = function createSchema() {
  return (0, _apolloServer.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
};

var _default = createSchema;
exports["default"] = _default;