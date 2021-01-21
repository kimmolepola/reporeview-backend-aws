"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = exports.ApplicationError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _es6Error = _interopRequireDefault(require("es6-error"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ApplicationError = /*#__PURE__*/function (_ExtendableError) {
  (0, _inherits2["default"])(ApplicationError, _ExtendableError);

  var _super = _createSuper(ApplicationError);

  function ApplicationError(message, status, properties) {
    var _this;

    (0, _classCallCheck2["default"])(this, ApplicationError);
    _this = _super.call(this, message);
    _this.message = message || 'Something went wrong';
    _this.status = status || 500;
    _this.properties = properties || null;
    return _this;
  }

  (0, _createClass2["default"])(ApplicationError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        message: this.message,
        properties: this.properties,
        status: this.status
      };
    }
  }]);
  return ApplicationError;
}(_es6Error["default"]);

exports.ApplicationError = ApplicationError;

var NotFoundError = /*#__PURE__*/function (_ApplicationError) {
  (0, _inherits2["default"])(NotFoundError, _ApplicationError);

  var _super2 = _createSuper(NotFoundError);

  function NotFoundError(message, properties) {
    (0, _classCallCheck2["default"])(this, NotFoundError);
    return _super2.call(this, message || 'The requested resource is not found', 404, properties);
  }

  return NotFoundError;
}(ApplicationError);

exports.NotFoundError = NotFoundError;