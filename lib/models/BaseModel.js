"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseModel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _objection = require("objection");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseModel = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(BaseModel, _Model);

  var _super = _createSuper(BaseModel);

  function BaseModel() {
    (0, _classCallCheck2["default"])(this, BaseModel);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(BaseModel, [{
    key: "$beforeInsert",
    value: function $beforeInsert() {
      if (!this.createdAt) {
        this.createdAt = new Date();
      }
    }
  }, {
    key: "$beforeUpdate",
    value: function $beforeUpdate() {
      if (!this.updatedAt) {
        this.updatedAt = new Date();
      }
    }
  }], [{
    key: "useLimitInFirst",
    get: function get() {
      return true;
    }
  }]);
  return BaseModel;
}(_objection.Model);

exports.BaseModel = BaseModel;
var _default = BaseModel;
exports["default"] = _default;