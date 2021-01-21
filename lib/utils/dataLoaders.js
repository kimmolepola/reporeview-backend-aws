"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createDataLoaders = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _lodash = require("lodash");

var jsonCacheKeyFn = function jsonCacheKeyFn(value) {
  return JSON.stringify(value);
};

var createModelLoader = function createModelLoader(Model) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ids) {
      var idColumns, camelCasedIdColumns, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              idColumns = (0, _lodash.isArray)(Model.idColumn) ? Model.idColumn : [Model.idColumn];
              camelCasedIdColumns = idColumns.map(function (id) {
                return (0, _lodash.camelCase)(id);
              });
              _context.next = 4;
              return Model.query().findByIds(ids);

            case 4:
              results = _context.sent;
              return _context.abrupt("return", ids.map(function (id) {
                return (0, _lodash.find)(results, (0, _lodash.zipObject)(camelCasedIdColumns, (0, _lodash.isArray)(id) ? id : [id])) || null;
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), {
    cacheKeyFn: jsonCacheKeyFn
  });
};

var createRepositoryRatingAverageLoader = function createRepositoryRatingAverageLoader(Review) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(repositoryIds) {
      var reviews;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Review.query().whereIn('repositoryId', repositoryIds).avg('rating', {
                as: 'ratingAverage'
              }).groupBy('repositoryId').select('repositoryId');

            case 2:
              reviews = _context2.sent;
              return _context2.abrupt("return", repositoryIds.map(function (id) {
                var review = reviews.find(function (_ref3) {
                  var repositoryId = _ref3.repositoryId;
                  return repositoryId === id;
                });
                return review ? review.ratingAverage : 0;
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var createRepositoryReviewCountLoader = function createRepositoryReviewCountLoader(Review) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(repositoryIds) {
      var reviews;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Review.query().whereIn('repositoryId', repositoryIds).count('*', {
                as: 'reviewsCount'
              }).groupBy('repositoryId').select('repositoryId');

            case 2:
              reviews = _context3.sent;
              return _context3.abrupt("return", repositoryIds.map(function (id) {
                var review = reviews.find(function (_ref5) {
                  var repositoryId = _ref5.repositoryId;
                  return repositoryId === id;
                });
                return review ? review.reviewsCount : 0;
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var createUserRepositoryReviewExistsLoader = function createUserRepositoryReviewExistsLoader(Review) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userIdRepositoryIdTuples) {
      var userIds, repositoryIds, reviews;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userIds = userIdRepositoryIdTuples.map(function (_ref7) {
                var _ref8 = (0, _slicedToArray2["default"])(_ref7, 1),
                    userId = _ref8[0];

                return userId;
              });
              repositoryIds = userIdRepositoryIdTuples.map(function (_ref9) {
                var _ref10 = (0, _slicedToArray2["default"])(_ref9, 2),
                    repositoryId = _ref10[1];

                return repositoryId;
              });
              _context4.next = 4;
              return Review.query().whereIn('repositoryId', repositoryIds).andWhere(function (qb) {
                return qb.whereIn('userId', userIds);
              }).select('repositoryId', 'userId');

            case 4:
              reviews = _context4.sent;
              return _context4.abrupt("return", userIdRepositoryIdTuples.map(function (_ref11) {
                var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                    userId = _ref12[0],
                    repositoryId = _ref12[1];

                return !!reviews.find(function (r) {
                  return r.userId === userId && r.repositoryId === repositoryId;
                });
              }));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref6.apply(this, arguments);
    };
  }(), {
    cacheKeyFn: jsonCacheKeyFn
  });
};

var createUserReviewCountLoader = function createUserReviewCountLoader(Review) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userIds) {
      var reviews;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Review.query().whereIn('userId', userIds).count('*', {
                as: 'reviewsCount'
              }).groupBy('userId').select('userId');

            case 2:
              reviews = _context5.sent;
              return _context5.abrupt("return", userIds.map(function (id) {
                var review = reviews.find(function (_ref14) {
                  var userId = _ref14.userId;
                  return userId === id;
                });
                return review ? review.reviewsCount : 0;
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref13.apply(this, arguments);
    };
  }());
};

var createDataLoaders = function createDataLoaders(_ref15) {
  var models = _ref15.models;
  return {
    repositoryLoader: createModelLoader(models.Repository),
    userLoader: createModelLoader(models.User),
    reviewLoader: createModelLoader(models.Review),
    repositoryRatingAverageLoader: createRepositoryRatingAverageLoader(models.Review),
    repositoryReviewCountLoader: createRepositoryReviewCountLoader(models.Review),
    userRepositoryReviewExistsLoader: createUserRepositoryReviewExistsLoader(models.Review),
    userReviewCountLoader: createUserReviewCountLoader(models.Review)
  };
};

exports.createDataLoaders = createDataLoaders;
var _default = createDataLoaders;
exports["default"] = _default;