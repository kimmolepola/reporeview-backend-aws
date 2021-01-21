"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Mutation {\n    \"\"\"\n    Deletes the review which has the given id, if it is created by the authorized user.\n    \"\"\"\n    deleteReview(id: ID!): Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Mutation: {
    deleteReview: function () {
      var _deleteReview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args, _ref) {
        var Review, authService, userId, review;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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