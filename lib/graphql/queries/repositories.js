"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

var _objection = require("objection");

var yup = _interopRequireWildcard(require("yup"));

var _createPaginationQuery = _interopRequireDefault(require("../../utils/createPaginationQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  enum AllRepositoriesOrderBy {\n    CREATED_AT\n    RATING_AVERAGE\n  }\n\n  extend type Query {\n    \"\"\"\n    Returns paginated repositories.\n    \"\"\"\n    repositories(\n      after: String\n      first: Int\n      orderDirection: OrderDirection\n      orderBy: AllRepositoriesOrderBy\n      searchKeyword: String\n      ownerName: String\n    ): RepositoryConnection!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var repositoriesArgsSchema = yup.object({
  after: yup.string(),
  first: yup.number().min(1).max(30)["default"](30),
  orderDirection: yup.string()["default"]('DESC'),
  orderBy: yup.string()["default"]('CREATED_AT'),
  searchKeyword: yup.string().trim(),
  ownerName: yup.string().trim()
});
var orderColumnByOrderBy = {
  CREATED_AT: 'createdAt',
  RATING_AVERAGE: 'ratingAverage'
};

var getLikeFilter = function getLikeFilter(value) {
  return "%".concat(value, "%");
};

var resolvers = {
  Query: {
    repositories: function () {
      var _repositories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args, _ref) {
        var Repository, normalizedArgs, first, orderDirection, after, orderBy, searchKeyword, ownerName, orderColumn, query, likeFilter;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Repository = _ref.models.Repository;
                _context.next = 3;
                return repositoriesArgsSchema.validate(args);

              case 3:
                normalizedArgs = _context.sent;
                first = normalizedArgs.first, orderDirection = normalizedArgs.orderDirection, after = normalizedArgs.after, orderBy = normalizedArgs.orderBy, searchKeyword = normalizedArgs.searchKeyword, ownerName = normalizedArgs.ownerName;
                orderColumn = orderColumnByOrderBy[orderBy];
                query = Repository.query();

                if (ownerName) {
                  query = query.where({
                    ownerName: ownerName
                  });
                } else if (searchKeyword) {
                  likeFilter = getLikeFilter(searchKeyword);
                  query = query.where('ownerName', 'like', likeFilter).orWhere('name', 'like', likeFilter);
                }

                if (orderColumn === 'ratingAverage') {
                  query = query.select(['repositories.*', // Missing reviews should have average of 0 not null
                  (0, _objection.raw)('coalesce((select avg(rating) as rating_average from reviews where repository_id = repositories.id group by repository_id), 0) as rating_average')]);
                }

                return _context.abrupt("return", (0, _createPaginationQuery["default"])(function () {
                  return query.clone();
                }, {
                  first: first,
                  after: after,
                  orderDirection: orderDirection.toLowerCase(),
                  orderColumn: orderColumn
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function repositories(_x, _x2, _x3) {
        return _repositories.apply(this, arguments);
      }

      return repositories;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;