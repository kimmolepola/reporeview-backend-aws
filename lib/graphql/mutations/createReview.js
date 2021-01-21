"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

var yup = _interopRequireWildcard(require("yup"));

var _githubClient = require("../../utils/githubClient");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  input CreateReviewInput {\n    repositoryName: String!\n    ownerName: String!\n    rating: Int!\n    text: String\n  }\n\n  extend type Mutation {\n    \"\"\"\n    Creates a review for the given repository defined by repositoryName and ownerName.\n    \"\"\"\n    createReview(review: CreateReviewInput): Review\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;

var RepositoryAlreadyReviewedError = /*#__PURE__*/function (_ApolloError) {
  _inherits(RepositoryAlreadyReviewedError, _ApolloError);

  var _super = _createSuper(RepositoryAlreadyReviewedError);

  function RepositoryAlreadyReviewedError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'User has already reviewed this repository';

    _classCallCheck(this, RepositoryAlreadyReviewedError);

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
      var _createReview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args, _ref) {
        var _ref$models, Repository, Review, githubClient, authService, userId, normalizedReview, repositoryName, ownerName, existingRepository, repositoryId, githubRepository, id, existringReview;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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