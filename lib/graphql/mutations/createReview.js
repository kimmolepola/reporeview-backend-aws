"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var yup = _interopRequireWildcard(require("yup"));

var _githubClient = require("../../utils/githubClient");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  input CreateReviewInput {\n    repositoryName: String!\n    ownerName: String!\n    rating: Int!\n    text: String\n  }\n\n  extend type Mutation {\n    \"\"\"\n    Creates a review for the given repository defined by repositoryName and ownerName.\n    \"\"\"\n    createReview(review: CreateReviewInput): Review\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;

var RepositoryAlreadyReviewedError = /*#__PURE__*/function (_ApolloError) {
  (0, _inherits2["default"])(RepositoryAlreadyReviewedError, _ApolloError);

  var _super = _createSuper(RepositoryAlreadyReviewedError);

  function RepositoryAlreadyReviewedError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'User has already reviewed this repository';
    (0, _classCallCheck2["default"])(this, RepositoryAlreadyReviewedError);
    return _super.call(this, message, 'REPOSITORY_ALREADY_REVIEWED');
  }

  return RepositoryAlreadyReviewedError;
}(_apolloServer.ApolloError);

var createRepositoryId = function createRepositoryId(ownerUsername, repositoryName) {
  return [ownerUsername, repositoryName].join('.');
};

var createReviewInputSchema = yup.object().shape({
  repositoryName: yup.string().required().lowercase().trim(),
  ownerName: yup.string().required().lowercase().trim(),
  rating: yup.number().integer().min(0).max(100).required(),
  text: yup.string().max(2000).trim()
});
var resolvers = {
  Mutation: {
    createReview: function () {
      var _createReview = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var _ref$models, Repository, Review, githubClient, authService, userId, normalizedReview, repositoryName, ownerName, existingRepository, repositoryId, githubRepository, id, existringReview;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$models = _ref.models, Repository = _ref$models.Repository, Review = _ref$models.Review, githubClient = _ref.githubClient, authService = _ref.authService;
                userId = authService.assertIsAuthorized();
                _context.next = 4;
                return createReviewInputSchema.validate(args.review, {
                  stripUnknown: true
                });

              case 4:
                normalizedReview = _context.sent;
                repositoryName = normalizedReview.repositoryName, ownerName = normalizedReview.ownerName;
                _context.next = 8;
                return Repository.query().findOne({
                  name: repositoryName,
                  ownerName: ownerName
                });

              case 8:
                existingRepository = _context.sent;
                repositoryId = existingRepository ? existingRepository.id : createRepositoryId(ownerName, repositoryName);

                if (existingRepository) {
                  _context.next = 18;
                  break;
                }

                _context.next = 13;
                return githubClient.getRepository(ownerName, repositoryName);

              case 13:
                githubRepository = _context.sent;

                if (githubRepository) {
                  _context.next = 16;
                  break;
                }

                throw _githubClient.GithubRepositoryNotFoundError.fromNames(ownerName, repositoryName);

              case 16:
                _context.next = 18;
                return Repository.query().insert({
                  id: repositoryId,
                  ownerName: ownerName,
                  name: repositoryName
                });

              case 18:
                id = [userId, repositoryId].join('.');
                _context.next = 21;
                return Review.query().findById(id);

              case 21:
                existringReview = _context.sent;

                if (!existringReview) {
                  _context.next = 24;
                  break;
                }

                throw new RepositoryAlreadyReviewedError();

              case 24:
                _context.next = 26;
                return Review.query().insert({
                  id: id,
                  userId: userId,
                  repositoryId: repositoryId,
                  text: normalizedReview.text,
                  rating: normalizedReview.rating
                });

              case 26:
                return _context.abrupt("return", Review.query().findById(id));

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createReview(_x, _x2, _x3) {
        return _createReview.apply(this, arguments);
      }

      return createReview;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;