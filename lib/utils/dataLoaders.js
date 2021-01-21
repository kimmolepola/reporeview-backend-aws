"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createDataLoaders = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jsonCacheKeyFn = function jsonCacheKeyFn(value) {
  return JSON.stringify(value);
};

var createModelLoader = function createModelLoader(Model) {
  return new _dataloader["default"]( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ids) {
      var idColumns, camelCasedIdColumns, results;
      return regeneratorRuntime.wrap(function _callee$(_context) {
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(repositoryIds) {
      var reviews;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(repositoryIds) {
      var reviews;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userIdRepositoryIdTuples) {
      var userIds, repositoryIds, reviews;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userIds = userIdRepositoryIdTuples.map(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 1),
                    userId = _ref8[0];

                return userId;
              });
              repositoryIds = userIdRepositoryIdTuples.map(function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 2),
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
                var _ref12 = _slicedToArray(_ref11, 2),
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
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userIds) {
      var reviews;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
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