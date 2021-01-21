"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _createPaginationQuery = _interopRequireDefault(require("../utils/createPaginationQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var Repository, githubClient, _ctx$dataLoaders, repositoryRatingAverageLoader, repositoryReviewCountLoader, data, repositoryIds, _yield$Promise$all, _yield$Promise$all2, githubRepositories, reviewCounts, ratingAverages;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
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