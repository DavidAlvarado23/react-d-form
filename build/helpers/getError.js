"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.withError = void 0;
var react_1 = __importDefault(require("react"));
var getErrorMessage = function (validation, name) {
  if (validation) {
    return validation[name] && validation[name].errorMessage
      ? validation[name].errorMessage
      : "Required";
  }
  return "";
};
var getValidation = function (validation, name, showValidation) {
  if (showValidation && validation) {
    if (validation[name] && !validation[name].isValid) {
      return "error";
    } else {
      return null;
    }
  }
  return null;
};
var getError = function (name, showValidation, usedFields, validation) {
  // return false
  var valid = getValidation(validation, name, true);
  var errorMessage = getErrorMessage(validation, name);
  if (usedFields && usedFields.includes(name) && valid == "error") {
    return { content: errorMessage };
  }
  return showValidation && valid == "error" ? { content: errorMessage } : false;
};
var withError = function (Comp) {
  return function (props) {
    var error = getError(
      props.name,
      props.showValidation == true,
      props.usedFields,
      props.validationForm
    );
    return react_1.default.createElement(
      Comp,
      __assign({}, props, { error: error })
    );
  };
};
exports.withError = withError;
//# sourceMappingURL=getError.js.map
