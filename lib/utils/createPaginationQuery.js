"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var serializeCursor = function serializeCursor(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
};

var parseCursor = function parseCursor(cursor) {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
  } catch (_unused) {
    return undefined;
  }
};

var getComparator = function getComparator(orderDirection) {
  return orderDirection === 'asc' ? '>' : '<';
};

var createPaginationQuery = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(getQuery) {
    var options,
        _options$first,
        firstCount,
        after,
        _options$orderDirecti,
        orderDirection,
        orderColumn,
        _options$idColumn,
        idColumn,
        parsedCursor,
        paginatedQuery,
        _parsedCursor,
        idValue,
        orderColumnValue,
        _yield$Promise$all,
        _yield$Promise$all2,
        totalCount,
        data,
        edges,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _options$first = options.first, firstCount = _options$first === void 0 ? 30 : _options$first, after = options.after, _options$orderDirecti = options.orderDirection, orderDirection = _options$orderDirecti === void 0 ? 'asc' : _options$orderDirecti, orderColumn = options.orderColumn, _options$idColumn = options.idColumn, idColumn = _options$idColumn === void 0 ? 'id' : _options$idColumn;
            parsedCursor = after ? parseCursor(after) : undefined;
            paginatedQuery = getQuery();

            if (parsedCursor) {
              _parsedCursor = _slicedToArray(parsedCursor, 2), idValue = _parsedCursor[0], orderColumnValue = _parsedCursor[1];
              paginatedQuery = paginatedQuery.andWhere(function (qb) {
                qb.where(orderColumn, getComparator(orderDirection), orderColumnValue).orWhere(function (qb) {
                  return qb.where(orderColumn, '=', orderColumnValue).andWhere(idColumn, getComparator(orderDirection), idValue);
                });
              });
            }

            paginatedQuery = paginatedQuery.orderBy([{
              column: orderColumn,
              order: orderDirection
            }, {
              column: idColumn,
              order: orderDirection
            }]).limit(firstCount + 1);
            _context.next = 8;
            return Promise.all([getQuery().count('*', {
              as: 'count'
            }), paginatedQuery]);

          case 8:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            totalCount = _yield$Promise$all2[0];
            data = _yield$Promise$all2[1];
            edges = data.slice(0, firstCount).map(function (d) {
              return {
                node: d,
                cursor: serializeCursor([d[idColumn], d[orderColumn]])
              };
            });
            return _context.abrupt("return", {
              pageInfo: {
                totalCount: totalCount[0]['count'],
                hasNextPage: data.length > firstCount,
                endCursor: (0, _lodash.get)((0, _lodash.last)(edges), 'cursor'),
                startCursor: (0, _lodash.get)((0, _lodash.first)(edges), 'cursor')
              },
              edges: edges
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPaginationQuery(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createPaginationQuery;
exports["default"] = _default;