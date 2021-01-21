"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _createPaginationQuery = _interopRequireDefault(require("../utils/createPaginationQuery"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = new _koaRouter["default"]();

var getNormalizedRepository = function getNormalizedRepository(repository, githubRepository, reviewCount, ratingAverage) {
  return {
    id: repository.id,
    name: repository.name,
    ownerName: repository.ownerName,
    createdAt: repository.createdAt ? new Date(repository.createdAt) : null,
    fullName: [repository.ownerName, repository.name].join('/'),
    reviewCount: reviewCount,
    ratingAverage: Math.round(ratingAverage),
    forksCount: (0, _lodash.get)(githubRepository, 'forks_count') || 0,
    stargazersCount: (0, _lodash.get)(githubRepository, 'stargazers_count') || 0,
    description: (0, _lodash.get)(githubRepository, 'description') || null,
    language: (0, _lodash.get)(githubRepository, 'language') || null,
    ownerAvatarUrl: (0, _lodash.get)(githubRepository, 'owner.avatar_url') || null
  };
};

router.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var Repository, githubClient, _ctx$dataLoaders, repositoryRatingAverageLoader, repositoryReviewCountLoader, data, repositoryIds, _yield$Promise$all, _yield$Promise$all2, githubRepositories, reviewCounts, ratingAverages;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Repository = ctx.models.Repository, githubClient = ctx.githubClient, _ctx$dataLoaders = ctx.dataLoaders, repositoryRatingAverageLoader = _ctx$dataLoaders.repositoryRatingAverageLoader, repositoryReviewCountLoader = _ctx$dataLoaders.repositoryReviewCountLoader;
            _context.next = 3;
            return (0, _createPaginationQuery["default"])(function () {
              return Repository.query();
            }, {
              orderColumn: 'createdAt'
            });

          case 3:
            data = _context.sent;
            repositoryIds = data.edges.map(function (edge) {
              return edge.node.id;
            });
            _context.next = 7;
            return Promise.all([Promise.all(data.edges.map(function (edge) {
              return githubClient.getRepository(edge.node.ownerName, edge.node.name);
            })), repositoryReviewCountLoader.loadMany(repositoryIds), repositoryRatingAverageLoader.loadMany(repositoryIds)]);

          case 7:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 3);
            githubRepositories = _yield$Promise$all2[0];
            reviewCounts = _yield$Promise$all2[1];
            ratingAverages = _yield$Promise$all2[2];
            ctx.body = _objectSpread(_objectSpread({}, data), {}, {
              edges: data.edges.map(function (edge, index) {
                return _objectSpread(_objectSpread({}, edge), {}, {
                  node: getNormalizedRepository(edge.node, githubRepositories[index], reviewCounts[index], ratingAverages[index])
                });
              })
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;