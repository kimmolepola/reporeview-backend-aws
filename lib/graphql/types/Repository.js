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

var _lodash = require("lodash");

var yup = _interopRequireWildcard(require("yup"));

var _createPaginationQuery = _interopRequireDefault(require("../../utils/createPaginationQuery"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  type Repository {\n    id: ID!\n    ownerName: String!\n    name: String!\n    user: User!\n    createdAt: DateTime!\n    fullName: String!\n    reviews(first: Int, after: String): ReviewConnection!\n    ratingAverage: Int!\n    reviewCount: Int!\n    stargazersCount: Int\n    watchersCount: Int\n    forksCount: Int\n    openIssuesCount: Int\n    url: String\n    ownerAvatarUrl: String\n    description: String\n    language: String\n    authorizedUserHasReviewed: Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var reviewsArgsSchema = yup.object({
  after: yup.string(),
  first: yup.number().min(1).max(30)["default"](30)
});

var makeGithubRepositoryResolver = function makeGithubRepositoryResolver(getValue) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, args, _ref2) {
      var ownerName, name, githubClient;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ownerName = _ref.ownerName, name = _ref.name;
              githubClient = _ref2.githubClient;
              _context.t0 = getValue;
              _context.next = 5;
              return githubClient.getRepository(ownerName, name);

            case 5:
              _context.t1 = _context.sent;
              return _context.abrupt("return", (0, _context.t0)(_context.t1));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var resolvers = {
  Repository: {
    user: function user(_ref4, args, _ref5) {
      var userId = _ref4.userId;
      var userLoader = _ref5.dataLoaders.userLoader;
      return userLoader.load(userId);
    },
    reviews: function () {
      var _reviews = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(obj, args, _ref6) {
        var Review, normalizedArgs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Review = _ref6.models.Review;
                _context2.next = 3;
                return reviewsArgsSchema.validate(args);

              case 3:
                normalizedArgs = _context2.sent;
                return _context2.abrupt("return", (0, _createPaginationQuery["default"])(function () {
                  return Review.query().where({
                    repositoryId: obj.id
                  });
                }, {
                  orderColumn: 'createdAt',
                  orderDirection: 'desc',
                  first: normalizedArgs.first,
                  after: normalizedArgs.after
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function reviews(_x4, _x5, _x6) {
        return _reviews.apply(this, arguments);
      }

      return reviews;
    }(),
    ratingAverage: function () {
      var _ratingAverage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref7, args, _ref8) {
        var id, repositoryRatingAverageLoader;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref7.id;
                repositoryRatingAverageLoader = _ref8.dataLoaders.repositoryRatingAverageLoader;
                _context3.t0 = Math;
                _context3.next = 5;
                return repositoryRatingAverageLoader.load(id);

              case 5:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", _context3.t0.round.call(_context3.t0, _context3.t1));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function ratingAverage(_x7, _x8, _x9) {
        return _ratingAverage.apply(this, arguments);
      }

      return ratingAverage;
    }(),
    reviewCount: function reviewCount(_ref9, args, _ref10) {
      var id = _ref9.id;
      var repositoryReviewCountLoader = _ref10.dataLoaders.repositoryReviewCountLoader;
      return repositoryReviewCountLoader.load(id);
    },
    authorizedUserHasReviewed: function authorizedUserHasReviewed(_ref11, args, _ref12) {
      var id = _ref11.id;
      var userRepositoryReviewExistsLoader = _ref12.dataLoaders.userRepositoryReviewExistsLoader,
          authService = _ref12.authService;
      var userId = authService.getUserId();
      return userId ? userRepositoryReviewExistsLoader.load([userId, id]) : null;
    },
    fullName: function fullName(_ref13) {
      var ownerName = _ref13.ownerName,
          name = _ref13.name;
      return [ownerName, name].join('/');
    },
    ownerAvatarUrl: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'owner.avatar_url');
    }),
    description: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'description');
    }),
    stargazersCount: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'stargazers_count') || 0;
    }),
    watchersCount: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'watchers_count') || 0;
    }),
    forksCount: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'forks_count') || 0;
    }),
    openIssuesCount: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'open_issues_count') || 0;
    }),
    url: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'html_url');
    }),
    language: makeGithubRepositoryResolver(function (repository) {
      return (0, _lodash.get)(repository, 'language');
    })
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;