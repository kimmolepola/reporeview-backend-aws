"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(getQuery) {
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

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _options$first = options.first, firstCount = _options$first === void 0 ? 30 : _options$first, after = options.after, _options$orderDirecti = options.orderDirection, orderDirection = _options$orderDirecti === void 0 ? 'asc' : _options$orderDirecti, orderColumn = options.orderColumn, _options$idColumn = options.idColumn, idColumn = _options$idColumn === void 0 ? 'id' : _options$idColumn;
            parsedCursor = after ? parseCursor(after) : undefined;
            paginatedQuery = getQuery();

            if (parsedCursor) {
              _parsedCursor = (0, _slicedToArray2["default"])(parsedCursor, 2), idValue = _parsedCursor[0], orderColumnValue = _parsedCursor[1];
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
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
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