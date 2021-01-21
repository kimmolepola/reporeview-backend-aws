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

var _objection = require("objection");

var yup = _interopRequireWildcard(require("yup"));

var _createPaginationQuery = _interopRequireDefault(require("../../utils/createPaginationQuery"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  enum AllRepositoriesOrderBy {\n    CREATED_AT\n    RATING_AVERAGE\n  }\n\n  extend type Query {\n    \"\"\"\n    Returns paginated repositories.\n    \"\"\"\n    repositories(\n      after: String\n      first: Int\n      orderDirection: OrderDirection\n      orderBy: AllRepositoriesOrderBy\n      searchKeyword: String\n      ownerName: String\n    ): RepositoryConnection!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

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
      var _repositories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var Repository, normalizedArgs, first, orderDirection, after, orderBy, searchKeyword, ownerName, orderColumn, query, likeFilter;
        return _regenerator["default"].wrap(function _callee$(_context) {
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