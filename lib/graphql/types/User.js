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

var yup = _interopRequireWildcard(require("yup"));

var _createPaginationQuery = _interopRequireDefault(require("../../utils/createPaginationQuery"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  type User {\n    id: ID!\n    username: String!\n    createdAt: DateTime!\n    reviews(first: Int, after: String): ReviewConnection!\n    reviewCount: Int!\n  }\n"]);

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
var resolvers = {
  User: {
    reviews: function () {
      var _reviews = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var Review, normalizedArgs;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Review = _ref.models.Review;
                _context.next = 3;
                return reviewsArgsSchema.validate(args);

              case 3:
                normalizedArgs = _context.sent;
                return _context.abrupt("return", (0, _createPaginationQuery["default"])(function () {
                  return Review.query().where({
                    userId: obj.id
                  });
                }, {
                  orderColumn: 'createdAt',
                  orderDirection: 'desc',
                  first: normalizedArgs.first,
                  after: normalizedArgs.after
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function reviews(_x, _x2, _x3) {
        return _reviews.apply(this, arguments);
      }

      return reviews;
    }(),
    reviewCount: function () {
      var _reviewCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2, args, _ref3) {
        var id, userReviewCountLoader;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                userReviewCountLoader = _ref3.dataLoaders.userReviewCountLoader;
                return _context2.abrupt("return", userReviewCountLoader.load(id));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function reviewCount(_x4, _x5, _x6) {
        return _reviewCount.apply(this, arguments);
      }

      return reviewCount;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;