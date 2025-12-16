"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComponent = void 0;
var react_1 = __importStar(require("react"));
var regex_1 = __importDefault(require("./regex"));
var lodash_1 = require("lodash");
var hasKey_1 = require("../helpers/hasKey");
/**
 *  TODO Send only the required props
 * @param FormComponentes
 * @param props
 */
var GetComponent = function (FormComponentes, props) {
  if (props.field.component == null) {
    var Elm = FormComponentes[props.field.type];
    if (
      (props.field.type == "Input" || props.field.type == "TextArea") &&
      props.executeChangeOnBlur
    ) {
      return react_1.default.createElement(
        Elm,
        __assign(
          {
            onChange: function (val) {
              return props.onFieldsChange(props.field, val, false);
            },
            onBlur: function (val) {
              return props.onFieldsChange(props.field, val, true);
            },
            executeChangeOnBlur: true,
          },
          props,
          props.field
        )
      );
    }
    return react_1.default.createElement(
      Elm,
      __assign(
        {
          onChange: function (val) {
            return props.onFieldsChange(props.field, val, true);
          },
        },
        props,
        props.field
      )
    );
  } else {
    //the output state, the state of the form , onChange
    var Elm = props.field.component(
      props.fieldsState.data,
      props.defaultState,
      function (data, field) {
        return props.onFieldsChange(
          field ? { name: field } : props.field,
          data,
          true
        );
      },
      props.showValidation
    );
    return Elm;
  }
};
exports.GetComponent = GetComponent;
var Core = /** @class */ (function (_super) {
  __extends(Core, _super);
  function Core(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      fieldsState: {
        data: {},
        validation: {
          isFormValid: true,
        },
      },
      validationForm: {},
      usedFields: [],
      oldState: {
        data: {},
        validation: {
          isFormValid: true,
        },
      },
    };
    _this.onFieldsChange = _this.onFieldsChange.bind(_this);
    _this.getDataDependsOn = _this.getDataDependsOn.bind(_this);
    _this.rows = _this.rows.bind(_this);
    _this.fieldFn = _this.fieldFn.bind(_this);
    return _this;
  }
  // do not delete getSnapshotBeforeUpdate required this
  Core.prototype.componentDidUpdate = function () {};
  Core.prototype.getSnapshotBeforeUpdate = function (prevProps) {
    if (
      (this.props.fields.length > 0 &&
        Object.keys(this.state.fieldsState).length == 0) ||
      JSON.stringify(prevProps.defaultState) !=
        JSON.stringify(this.props.defaultState) ||
      JSON.stringify(prevProps.fields) != JSON.stringify(this.props.fields)
    ) {
      this.generateValues();
    }
    return null;
  };
  Core.prototype.componentDidMount = function () {
    this.generateValues();
  };
  Core.prototype.generateValues = function (_) {
    var _this = this;
    var _a = this.props,
      defaultState = _a.defaultState,
      fields = _a.fields;
    var fieldsState = this.state.fieldsState;
    var defaultStateIsNotEmpty =
      Object.keys(defaultState ? defaultState : {}).length > 0;
    var newState = fields.reduce(
      function (acc, _a) {
        var fields = _a.fields;
        var fFields = typeof fields == "function" ? fields({}) : fields;
        fFields.reduce(
          function (accField, currField) {
            var _a, _b;
            var val = currField.value ? currField.value : "";
            //if already have state
            if (
              typeof currField.name == "string" &&
              (0, hasKey_1.hasKey)(fieldsState.data, currField.name)
            ) {
              if (val == "" && fieldsState.data[currField.name]) {
                val = fieldsState.data[currField.name];
              }
            }
            //set defaultState
            if (
              defaultState &&
              defaultStateIsNotEmpty &&
              typeof currField.name == "string" &&
              (0, hasKey_1.hasKey)(defaultState, currField.name)
            ) {
              val = defaultState[currField.name];
            }
            val = _this.parseValue(currField, val);
            /**
             * returnOnlyValue prop maybe this never has been use
             */
            var validation = _this.validateField(currField, val);
            acc.validations = __assign(
              __assign({}, acc.validations),
              ((_a = {}), (_a[currField.name] = __assign({}, validation)), _a)
            );
            acc.state = __assign(
              __assign({}, acc.state),
              ((_b = {}), (_b[currField.name] = val), _b)
            );
            return accField;
          },
          { validation: {}, state: {} }
        );
        return acc;
      },
      { validations: {}, state: {} }
    );
    var isFormValid = this.getISFORMVALID(newState.validations);
    var newFieldsState = {
      data: __assign({}, newState.state),
      validation: { isFormValid: isFormValid },
    };
    var state = {
      validationForm: newState.validations,
      fieldsState: newFieldsState,
      oldState: fieldsState,
    };
    if (JSON.stringify(state.oldState) != JSON.stringify(state.fieldsState)) {
      this.setState(state);
      if (this.props.fields.length && this.props.onFormChange) {
        this.props.onFormChange(newFieldsState);
      }
    }
  };
  Core.prototype.getISFORMVALID = function (validations) {
    return !Object.entries(validations).some(function (_a) {
      var _ = _a[0],
        xValidation = _a[1];
      return !xValidation.isValid;
    });
  };
  Core.prototype.parseValue = function (field, val) {
    if (field.type === "Checkbox" && !val) {
      return false;
    }
    // if is number and is falsy
    if (
      field.props &&
      typeof field.props.type != undefined &&
      field.props.type == "number" &&
      !val
    ) {
      return 0;
    }
    //parse val tu number
    if (
      field.props &&
      typeof field.props.type != undefined &&
      field.props.type == "number" &&
      val
    ) {
      return +val;
    }
    return val;
  };
  Core.prototype.validateField = function (field, val) {
    var _a;
    var _b, _c, _d, _e, _f;
    if (typeof field.name !== "string") {
      return {
        isValid: false,
        errorMessage: "FIELD_NOT_FOUND",
      };
    }
    var _g = this.state,
      fieldsState = _g.fieldsState,
      validationForm = _g.validationForm;
    var isValid = true;
    var errorMessage =
      (_b = field.validation) === null || _b === void 0
        ? void 0
        : _b.errorMessage;
    //check if is required
    if (
      ((_c = field.validation) === null || _c === void 0
        ? void 0
        : _c.required) &&
      !val
    ) {
      isValid = false;
    }
    //check regex
    if (
      (_d = field.validation) === null || _d === void 0 ? void 0 : _d.regexType
    ) {
      var result =
        val &&
        val.match(
          regex_1.default[
            (_e = field.validation) === null || _e === void 0
              ? void 0
              : _e.regexType
          ]
        );
      if (!result) {
        isValid = false;
      }
    }
    //check custom validation
    if (
      (_f = field.validation) === null || _f === void 0 ? void 0 : _f.custom
    ) {
      var result = field.validation.custom(
        __assign(
          __assign({}, fieldsState.data),
          ((_a = {}), (_a[field.name] = val), _a)
        )
      );
      if (typeof result == "object") {
        errorMessage = result.errorMessage;
        isValid = result.valid;
      }
      if (typeof result == "boolean" && !result) {
        isValid = false;
      }
    }
    return __assign(__assign({}, validationForm[field.name]), {
      isValid: isValid,
      errorMessage: errorMessage ? errorMessage : "FIELD_REQUIRED",
    });
  };
  Core.prototype.onFieldsChange = function (field, val, doOnChange) {
    var _a, _b;
    var _c = this.state,
      validationForm = _c.validationForm,
      usedFields = _c.usedFields,
      fieldsState = _c.fieldsState;
    var value = this.parseValue(field, val);
    var validationField = this.validateField(field, value);
    var newValidation = __assign(
      __assign({}, validationForm),
      ((_a = {}), (_a[field.name] = validationField), _a)
    );
    var isFormValid = this.getISFORMVALID(newValidation);
    //use for know if the the field was used
    var newUsedFields = __spreadArray([], usedFields, true);
    if (typeof field.name == "string" && !usedFields.includes(field.name)) {
      newUsedFields = __spreadArray(
        __spreadArray([], usedFields, true),
        [field.name],
        false
      );
    }
    var newState = {
      data: __assign(
        __assign({}, fieldsState.data),
        ((_b = {}), (_b[field.name] = val === "" ? null : val), _b)
      ),
      validation: { isFormValid: isFormValid },
    };
    this.setState({
      fieldsState: newState,
      validationForm: newValidation,
      usedFields: newUsedFields,
    });
    if (doOnChange && this.props.onFormChange) {
      this.props.onFormChange(newState);
    }
  };
  Core.prototype.getDataDependsOn = function (field) {
    if (field.dataDependsOn) {
      var data = (0, lodash_1.get)(this.state.fieldsState, field.dataDependsOn);
      return data ? data : [];
    }
  };
  Core.prototype.getValue = function (field) {
    var _a = this.state,
      fieldsState = _a.fieldsState,
      oldState = _a.oldState;
    if (typeof field.name !== "string") {
      return "";
    }
    if (field.dataDependsOn) {
      var fieldDepends = field.dataDependsOn.split(".")[0];
      var current = (0, lodash_1.get)(fieldsState.data, fieldDepends);
      var old = (0, lodash_1.get)(oldState.data, fieldDepends);
      if (JSON.stringify(current) !== JSON.stringify(old)) {
        // fieldsState[typeField.name] = null;//prevent do this, just in extrme cases;
        return null;
      } else {
        return fieldsState.data[field.name];
      }
    } else {
      return fieldsState.data[field.name];
    }
  };
  Core.prototype.rows = function (rowChild) {
    var fields = this.props.fields;
    var fieldsState = this.state.fieldsState;
    return fields.map(function (field, rowKey) {
      var rowFields =
        typeof field.fields == "function"
          ? field.fields(fieldsState.data)
          : field.fields;
      return rowChild({ rowFields: rowFields, rowKey: rowKey });
    });
  };
  Core.prototype.fieldFn = function (rows, cb) {
    var _this = this;
    var _a = this.props,
      showValidation = _a.showValidation,
      executeChangeOnBlur = _a.executeChangeOnBlur,
      defaultState = _a.defaultState;
    var _b = this.state,
      validationForm = _b.validationForm,
      fieldsState = _b.fieldsState,
      usedFields = _b.usedFields;
    return rows.rowFields.map(function (typeField, key2) {
      return cb(
        {
          data: _this.getDataDependsOn(typeField),
          value: _this.getValue(typeField),
          fieldsState: fieldsState,
          onFieldsChange: _this.onFieldsChange,
          validationForm: validationForm,
          showValidation: showValidation,
          executeChangeOnBlur: executeChangeOnBlur,
          defaultState: defaultState,
          usedFields: usedFields,
          field: typeField,
        },
        key2
      );
    });
  };
  Core.prototype.render = function () {
    return react_1.default.createElement(react_1.default.Fragment, null);
  };
  return Core;
})(react_1.PureComponent);
exports.default = Core;
Core.defaultProps = {
  fields: [],
  onFormChange: function () {},
  executeChangeOnBlur: true,
  defaultState: {},
  parseState: function () {},
  showValidation: false,
};
//# sourceMappingURL=core.js.map
