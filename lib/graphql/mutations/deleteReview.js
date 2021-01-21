"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Mutation {\n    \"\"\"\n    Deletes the review which has the given id, if it is created by the authorized user.\n    \"\"\"\n    deleteReview(id: ID!): Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Mutation: {
    deleteReview: function () {
      var _deleteReview = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args, _ref) {
        var Review, authService, userId, review;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Review = _ref.models.Review, authService = _ref.authService;
                userId = authService.assertIsAuthorized();
                _context.next = 4;
                return Review.query().findById(args.id);

              case 4:
                review = _context.sent;

                if (review) {
                  _context.next = 7;
                  break;
                }

                throw new _apolloServer.UserInputError("Review with id ".concat(args.id, " does not exist"));

              case 7:
                if (!(review.userId !== userId)) {
                  _context.next = 9;
                  break;
                }

                throw new _apolloServer.ForbiddenError('User is not authorized to delete the review');

              case 9:
                _context.next = 11;
                return Review.query().findById(args.id)["delete"]();

              case 11:
                return _context.abrupt("return", true);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function deleteReview(_x, _x2, _x3) {
        return _deleteReview.apply(this, arguments);
      }

      return deleteReview;
    }()
  }
};
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;