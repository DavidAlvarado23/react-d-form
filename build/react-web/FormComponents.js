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
var react_1 = __importDefault(require("react"));
var index_1 = require("../index");
var Components = {
  Input: (0, index_1.withError)(function (_a) {
    var name = _a.name,
      label = _a.label,
      onChange = _a.onChange,
      onBlur = _a.onBlur,
      props = _a.props,
      value = _a.value,
      placeholder = _a.placeholder,
      error = _a.error;
    return react_1.default.createElement(
      react_1.default.Fragment,
      null,
      react_1.default.createElement("label", null, label),
      react_1.default.createElement(
        "input",
        __assign(
          {
            value: value,
            placeholder: placeholder,
            name: name,
            onChange: function (e) {
              return onChange(e.target.value);
            },
            onBlur: function (e) {
              return onBlur(e.target.value);
            },
          },
          props
        )
      ),
      error &&
        react_1.default.createElement(
          "label",
          { style: { color: "red" } },
          error.content
        )
    );
  }),
};
exports.default = Components;
//# sourceMappingURL=FormComponents.js.map
