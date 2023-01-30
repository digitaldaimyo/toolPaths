// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/TrichoidRectanglePocket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrichoidRectanglePocket = exports.Tool = exports.Rectangle = exports.FinishParams = exports.ENTRYTYPE = exports.ENTRYLOCATION = exports.CutParams = exports.Corner = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ENTRYLOCATION = {
  corner1: 0,
  corner2: 1,
  corner3: 2,
  corner4: 3,
  corner5: 4,
  center: 5
};
exports.ENTRYLOCATION = ENTRYLOCATION;
var ENTRYTYPE = {
  plunge: 0,
  spiral: 1,
  ramp: 2
};
exports.ENTRYTYPE = ENTRYTYPE;
var TrichoidRectanglePocket = /*#__PURE__*/function () {
  function TrichoidRectanglePocket(rectangle, cutParams, tools, corners, depth, entryType, entryLocation, finishParams, isSeperateFinish) {
    _classCallCheck(this, TrichoidRectanglePocket);
    this.rectangle = rectangle;
    this.cutParams = cutParams;
    this.tools = tools;
    this.corners = corners;
    this.depth = depth;
    this.entryType = entryType;
    this.entryLocation = entryLocation;
    this.finishParams = finishParams;
    this.isSeperateFinish = isSeperateFinish;
  }
  _createClass(TrichoidRectanglePocket, [{
    key: "moveToEntryPosition",
    value: function moveToEntryPosition() {}
  }, {
    key: "moveToCenter",
    value: function moveToCenter() {}
  }, {
    key: "moveToCorner",
    value: function moveToCorner(cornerNumber) {}
  }, {
    key: "spiralToDepth",
    value: function spiralToDepth() {}
  }, {
    key: "plungeToDepth",
    value: function plungeToDepth() {}
  }, {
    key: "rampToDepth",
    value: function rampToDepth() {}
  }]);
  return TrichoidRectanglePocket;
}();
exports.TrichoidRectanglePocket = TrichoidRectanglePocket;
var Rectangle = /*#__PURE__*/_createClass(function Rectangle(centerX, centerY, width, height) {
  _classCallCheck(this, Rectangle);
  this.centerX = centerX;
  this.centerY = centerY;
  this.width = width;
  this.height = height;
});
exports.Rectangle = Rectangle;
var CutParams = /*#__PURE__*/_createClass(function CutParams(aDoC, rDoC, speed, feed) {
  _classCallCheck(this, CutParams);
  this.aDoC = aDoC;
  this.rDoC = rDoC;
  this.speed = speed;
  this.feed = feed;
});
exports.CutParams = CutParams;
var FinishParams = /*#__PURE__*/_createClass(function FinishParams(isSeperateFinish, cutParams) {
  _classCallCheck(this, FinishParams);
  this.isSeperateFinish = isSeperateFinish;
  this.cutParams = cutParams;
});
exports.FinishParams = FinishParams;
var Corner = /*#__PURE__*/_createClass(function Corner(radius) {
  _classCallCheck(this, Corner);
  this.radius = radius;
});
exports.Corner = Corner;
var Tool = /*#__PURE__*/_createClass(function Tool(toolNumber) {
  _classCallCheck(this, Tool);
  this.toolNumber = toolNumber;
});
exports.Tool = Tool;
},{}],"src/libraries/lil-gui.min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StringController = exports.OptionController = exports.NumberController = exports.GUI = exports.FunctionController = exports.Controller = exports.ColorController = exports.BooleanController = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */
var t = /*#__PURE__*/function () {
  function t(i, e, s, n) {
    var l = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "div";
    _classCallCheck(this, t);
    this.parent = i, this.object = e, this.property = s, this._disabled = !1, this._hidden = !1, this.initialValue = this.getValue(), this.domElement = document.createElement("div"), this.domElement.classList.add("controller"), this.domElement.classList.add(n), this.$name = document.createElement("div"), this.$name.classList.add("name"), t.nextNameID = t.nextNameID || 0, this.$name.id = "lil-gui-name-" + ++t.nextNameID, this.$widget = document.createElement(l), this.$widget.classList.add("widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(s);
  }
  _createClass(t, [{
    key: "name",
    value: function name(_t) {
      return this._name = _t, this.$name.innerHTML = _t, this;
    }
  }, {
    key: "onChange",
    value: function onChange(_t2) {
      return this._onChange = _t2, this;
    }
  }, {
    key: "_callOnChange",
    value: function _callOnChange() {
      this.parent._callOnChange(this), void 0 !== this._onChange && this._onChange.call(this, this.getValue()), this._changed = !0;
    }
  }, {
    key: "onFinishChange",
    value: function onFinishChange(_t3) {
      return this._onFinishChange = _t3, this;
    }
  }, {
    key: "_callOnFinishChange",
    value: function _callOnFinishChange() {
      this._changed && (this.parent._callOnFinishChange(this), void 0 !== this._onFinishChange && this._onFinishChange.call(this, this.getValue())), this._changed = !1;
    }
  }, {
    key: "reset",
    value: function reset() {
      return this.setValue(this.initialValue), this._callOnFinishChange(), this;
    }
  }, {
    key: "enable",
    value: function enable() {
      var _t4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this.disable(!_t4);
    }
  }, {
    key: "disable",
    value: function disable() {
      var _t5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return _t5 === this._disabled || (this._disabled = _t5, this.domElement.classList.toggle("disabled", _t5), this.$disable.toggleAttribute("disabled", _t5)), this;
    }
  }, {
    key: "show",
    value: function show() {
      var _t6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this._hidden = !_t6, this.domElement.style.display = this._hidden ? "none" : "", this;
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.show(!1);
    }
  }, {
    key: "options",
    value: function options(_t7) {
      var i = this.parent.add(this.object, this.property, _t7);
      return i.name(this._name), this.destroy(), i;
    }
  }, {
    key: "min",
    value: function min(_t8) {
      return this;
    }
  }, {
    key: "max",
    value: function max(_t9) {
      return this;
    }
  }, {
    key: "step",
    value: function step(_t10) {
      return this;
    }
  }, {
    key: "decimals",
    value: function decimals(_t11) {
      return this;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _t12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this._listening = _t12, void 0 !== this._listenCallbackID && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this;
    }
  }, {
    key: "_listenCallback",
    value: function _listenCallback() {
      this._listenCallbackID = requestAnimationFrame(this._listenCallback);
      var _t13 = this.save();
      _t13 !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = _t13;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: "setValue",
    value: function setValue(_t14) {
      return this.object[this.property] = _t14, this._callOnChange(), this.updateDisplay(), this;
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: "load",
    value: function load(_t15) {
      return this.setValue(_t15), this._callOnFinishChange(), this;
    }
  }, {
    key: "save",
    value: function save() {
      return this.getValue();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.listen(!1), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement);
    }
  }]);
  return t;
}();
exports.Controller = t;
var i = /*#__PURE__*/function (_t16) {
  _inherits(i, _t16);
  var _super = _createSuper(i);
  function i(t, _i, e) {
    var _this;
    _classCallCheck(this, i);
    _this = _super.call(this, t, _i, e, "boolean", "label"), _this.$input = document.createElement("input"), _this.$input.setAttribute("type", "checkbox"), _this.$input.setAttribute("aria-labelledby", _this.$name.id), _this.$widget.appendChild(_this.$input), _this.$input.addEventListener("change", function () {
      _this.setValue(_this.$input.checked), _this._callOnFinishChange();
    }), _this.$disable = _this.$input, _this.updateDisplay();
    return _this;
  }
  _createClass(i, [{
    key: "updateDisplay",
    value: function updateDisplay() {
      return this.$input.checked = this.getValue(), this;
    }
  }]);
  return i;
}(t);
exports.BooleanController = i;
function e(t) {
  var i, e;
  return (i = t.match(/(#|0x)?([a-f0-9]{6})/i)) ? e = i[2] : (i = t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? e = parseInt(i[1]).toString(16).padStart(2, 0) + parseInt(i[2]).toString(16).padStart(2, 0) + parseInt(i[3]).toString(16).padStart(2, 0) : (i = t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (e = i[1] + i[1] + i[2] + i[2] + i[3] + i[3]), !!e && "#" + e;
}
var s = {
    isPrimitive: !0,
    match: function match(t) {
      return "string" == typeof t;
    },
    fromHexString: e,
    toHexString: e
  },
  n = {
    isPrimitive: !0,
    match: function match(t) {
      return "number" == typeof t;
    },
    fromHexString: function fromHexString(t) {
      return parseInt(t.substring(1), 16);
    },
    toHexString: function toHexString(t) {
      return "#" + t.toString(16).padStart(6, 0);
    }
  },
  l = {
    isPrimitive: !1,
    match: Array.isArray,
    fromHexString: function fromHexString(t, i) {
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var s = n.fromHexString(t);
      i[0] = (s >> 16 & 255) / 255 * e, i[1] = (s >> 8 & 255) / 255 * e, i[2] = (255 & s) / 255 * e;
    },
    toHexString: function toHexString(_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
        t = _ref2[0],
        i = _ref2[1],
        e = _ref2[2];
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return n.toHexString(t * (s = 255 / s) << 16 ^ i * s << 8 ^ e * s << 0);
    }
  },
  r = {
    isPrimitive: !1,
    match: function match(t) {
      return Object(t) === t;
    },
    fromHexString: function fromHexString(t, i) {
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var s = n.fromHexString(t);
      i.r = (s >> 16 & 255) / 255 * e, i.g = (s >> 8 & 255) / 255 * e, i.b = (255 & s) / 255 * e;
    },
    toHexString: function toHexString(_ref3) {
      var t = _ref3.r,
        i = _ref3.g,
        e = _ref3.b;
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return n.toHexString(t * (s = 255 / s) << 16 ^ i * s << 8 ^ e * s << 0);
    }
  },
  o = [s, n, l, r];
var a = /*#__PURE__*/function (_t17) {
  _inherits(a, _t17);
  var _super2 = _createSuper(a);
  function a(t, i, s, n) {
    var _this2;
    _classCallCheck(this, a);
    var l;
    _this2 = _super2.call(this, t, i, s, "color"), _this2.$input = document.createElement("input"), _this2.$input.setAttribute("type", "color"), _this2.$input.setAttribute("tabindex", -1), _this2.$input.setAttribute("aria-labelledby", _this2.$name.id), _this2.$text = document.createElement("input"), _this2.$text.setAttribute("type", "text"), _this2.$text.setAttribute("spellcheck", "false"), _this2.$text.setAttribute("aria-labelledby", _this2.$name.id), _this2.$display = document.createElement("div"), _this2.$display.classList.add("display"), _this2.$display.appendChild(_this2.$input), _this2.$widget.appendChild(_this2.$display), _this2.$widget.appendChild(_this2.$text), _this2._format = (l = _this2.initialValue, o.find(function (t) {
      return t.match(l);
    })), _this2._rgbScale = n, _this2._initialValueHexString = _this2.save(), _this2._textFocused = !1, _this2.$input.addEventListener("input", function () {
      _this2._setValueFromHexString(_this2.$input.value);
    }), _this2.$input.addEventListener("blur", function () {
      _this2._callOnFinishChange();
    }), _this2.$text.addEventListener("input", function () {
      var t = e(_this2.$text.value);
      t && _this2._setValueFromHexString(t);
    }), _this2.$text.addEventListener("focus", function () {
      _this2._textFocused = !0, _this2.$text.select();
    }), _this2.$text.addEventListener("blur", function () {
      _this2._textFocused = !1, _this2.updateDisplay(), _this2._callOnFinishChange();
    }), _this2.$disable = _this2.$text, _this2.updateDisplay();
    return _this2;
  }
  _createClass(a, [{
    key: "reset",
    value: function reset() {
      return this._setValueFromHexString(this._initialValueHexString), this;
    }
  }, {
    key: "_setValueFromHexString",
    value: function _setValueFromHexString(t) {
      if (this._format.isPrimitive) {
        var _i2 = this._format.fromHexString(t);
        this.setValue(_i2);
      } else this._format.fromHexString(t, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
    }
  }, {
    key: "save",
    value: function save() {
      return this._format.toHexString(this.getValue(), this._rgbScale);
    }
  }, {
    key: "load",
    value: function load(t) {
      return this._setValueFromHexString(t), this._callOnFinishChange(), this;
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this;
    }
  }]);
  return a;
}(t);
exports.ColorController = a;
var h = /*#__PURE__*/function (_t18) {
  _inherits(h, _t18);
  var _super3 = _createSuper(h);
  function h(t, i, e) {
    var _this3;
    _classCallCheck(this, h);
    _this3 = _super3.call(this, t, i, e, "function"), _this3.$button = document.createElement("button"), _this3.$button.appendChild(_this3.$name), _this3.$widget.appendChild(_this3.$button), _this3.$button.addEventListener("click", function (t) {
      t.preventDefault(), _this3.getValue().call(_this3.object);
    }), _this3.$button.addEventListener("touchstart", function () {}, {
      passive: !0
    }), _this3.$disable = _this3.$button;
    return _this3;
  }
  return _createClass(h);
}(t);
exports.FunctionController = h;
var d = /*#__PURE__*/function (_t19) {
  _inherits(d, _t19);
  var _super4 = _createSuper(d);
  function d(t, i, e, s, n, l) {
    var _this4;
    _classCallCheck(this, d);
    _this4 = _super4.call(this, t, i, e, "number"), _this4._initInput(), _this4.min(s), _this4.max(n);
    var r = void 0 !== l;
    _this4.step(r ? l : _this4._getImplicitStep(), r), _this4.updateDisplay();
    return _this4;
  }
  _createClass(d, [{
    key: "decimals",
    value: function decimals(t) {
      return this._decimals = t, this.updateDisplay(), this;
    }
  }, {
    key: "min",
    value: function min(t) {
      return this._min = t, this._onUpdateMinMax(), this;
    }
  }, {
    key: "max",
    value: function max(t) {
      return this._max = t, this._onUpdateMinMax(), this;
    }
  }, {
    key: "step",
    value: function step(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return this._step = t, this._stepExplicit = i, this;
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      var t = this.getValue();
      if (this._hasSlider) {
        var _i3 = (t - this._min) / (this._max - this._min);
        _i3 = Math.max(0, Math.min(_i3, 1)), this.$fill.style.width = 100 * _i3 + "%";
      }
      return this._inputFocused || (this.$input.value = void 0 === this._decimals ? t : t.toFixed(this._decimals)), this;
    }
  }, {
    key: "_initInput",
    value: function _initInput() {
      var _this5 = this;
      this.$input = document.createElement("input"), this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$disable = this.$input;
      var t = function t(_t20) {
        var i = parseFloat(_this5.$input.value);
        isNaN(i) || (_this5._snapClampSetValue(i + _t20), _this5.$input.value = _this5.getValue());
      };
      var i,
        e,
        s,
        n,
        l,
        r = !1;
      var o = function o(t) {
          if (r) {
            var _s2 = t.clientX - i,
              _n2 = t.clientY - e;
            Math.abs(_n2) > 5 ? (t.preventDefault(), _this5.$input.blur(), r = !1, _this5._setDraggingStyle(!0, "vertical")) : Math.abs(_s2) > 5 && a();
          }
          if (!r) {
            var _i4 = t.clientY - s;
            l -= _i4 * _this5._step * _this5._arrowKeyMultiplier(t), n + l > _this5._max ? l = _this5._max - n : n + l < _this5._min && (l = _this5._min - n), _this5._snapClampSetValue(n + l);
          }
          s = t.clientY;
        },
        a = function a() {
          _this5._setDraggingStyle(!1, "vertical"), _this5._callOnFinishChange(), window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", a);
        };
      this.$input.addEventListener("input", function () {
        var t = parseFloat(_this5.$input.value);
        isNaN(t) || (_this5._stepExplicit && (t = _this5._snap(t)), _this5.setValue(_this5._clamp(t)));
      }), this.$input.addEventListener("keydown", function (i) {
        "Enter" === i.code && _this5.$input.blur(), "ArrowUp" === i.code && (i.preventDefault(), t(_this5._step * _this5._arrowKeyMultiplier(i))), "ArrowDown" === i.code && (i.preventDefault(), t(_this5._step * _this5._arrowKeyMultiplier(i) * -1));
      }), this.$input.addEventListener("wheel", function (i) {
        _this5._inputFocused && (i.preventDefault(), t(_this5._step * _this5._normalizeMouseWheel(i)));
      }, {
        passive: !1
      }), this.$input.addEventListener("mousedown", function (t) {
        i = t.clientX, e = s = t.clientY, r = !0, n = _this5.getValue(), l = 0, window.addEventListener("mousemove", o), window.addEventListener("mouseup", a);
      }), this.$input.addEventListener("focus", function () {
        _this5._inputFocused = !0;
      }), this.$input.addEventListener("blur", function () {
        _this5._inputFocused = !1, _this5.updateDisplay(), _this5._callOnFinishChange();
      });
    }
  }, {
    key: "_initSlider",
    value: function _initSlider() {
      var _this6 = this;
      this._hasSlider = !0, this.$slider = document.createElement("div"), this.$slider.classList.add("slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("hasSlider");
      var t = function t(_t21) {
          var i = _this6.$slider.getBoundingClientRect();
          var e = (s = _t21, n = i.left, l = i.right, r = _this6._min, o = _this6._max, (s - n) / (l - n) * (o - r) + r);
          var s, n, l, r, o;
          _this6._snapClampSetValue(e);
        },
        i = function i(_i5) {
          t(_i5.clientX);
        },
        e = function e() {
          _this6._callOnFinishChange(), _this6._setDraggingStyle(!1), window.removeEventListener("mousemove", i), window.removeEventListener("mouseup", e);
        };
      var s,
        n,
        l = !1;
      var r = function r(i) {
          i.preventDefault(), _this6._setDraggingStyle(!0), t(i.touches[0].clientX), l = !1;
        },
        o = function o(i) {
          if (l) {
            var _t22 = i.touches[0].clientX - s,
              _e2 = i.touches[0].clientY - n;
            Math.abs(_t22) > Math.abs(_e2) ? r(i) : (window.removeEventListener("touchmove", o), window.removeEventListener("touchend", a));
          } else i.preventDefault(), t(i.touches[0].clientX);
        },
        a = function a() {
          _this6._callOnFinishChange(), _this6._setDraggingStyle(!1), window.removeEventListener("touchmove", o), window.removeEventListener("touchend", a);
        },
        h = this._callOnFinishChange.bind(this);
      var _d2;
      this.$slider.addEventListener("mousedown", function (s) {
        _this6._setDraggingStyle(!0), t(s.clientX), window.addEventListener("mousemove", i), window.addEventListener("mouseup", e);
      }), this.$slider.addEventListener("touchstart", function (t) {
        t.touches.length > 1 || (_this6._hasScrollBar ? (s = t.touches[0].clientX, n = t.touches[0].clientY, l = !0) : r(t), window.addEventListener("touchmove", o, {
          passive: !1
        }), window.addEventListener("touchend", a));
      }, {
        passive: !1
      }), this.$slider.addEventListener("wheel", function (t) {
        if (Math.abs(t.deltaX) < Math.abs(t.deltaY) && _this6._hasScrollBar) return;
        t.preventDefault();
        var i = _this6._normalizeMouseWheel(t) * _this6._step;
        _this6._snapClampSetValue(_this6.getValue() + i), _this6.$input.value = _this6.getValue(), clearTimeout(_d2), _d2 = setTimeout(h, 400);
      }, {
        passive: !1
      });
    }
  }, {
    key: "_setDraggingStyle",
    value: function _setDraggingStyle(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "horizontal";
      this.$slider && this.$slider.classList.toggle("active", t), document.body.classList.toggle("lil-gui-dragging", t), document.body.classList.toggle("lil-gui-" + i, t);
    }
  }, {
    key: "_getImplicitStep",
    value: function _getImplicitStep() {
      return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : .1;
    }
  }, {
    key: "_onUpdateMinMax",
    value: function _onUpdateMinMax() {
      !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), !1), this._initSlider(), this.updateDisplay());
    }
  }, {
    key: "_normalizeMouseWheel",
    value: function _normalizeMouseWheel(t) {
      var i = t.deltaX,
        e = t.deltaY;
      Math.floor(t.deltaY) !== t.deltaY && t.wheelDelta && (i = 0, e = -t.wheelDelta / 120, e *= this._stepExplicit ? 1 : 10);
      return i + -e;
    }
  }, {
    key: "_arrowKeyMultiplier",
    value: function _arrowKeyMultiplier(t) {
      var i = this._stepExplicit ? 1 : 10;
      return t.shiftKey ? i *= 10 : t.altKey && (i /= 10), i;
    }
  }, {
    key: "_snap",
    value: function _snap(t) {
      var i = Math.round(t / this._step) * this._step;
      return parseFloat(i.toPrecision(15));
    }
  }, {
    key: "_clamp",
    value: function _clamp(t) {
      return t < this._min && (t = this._min), t > this._max && (t = this._max), t;
    }
  }, {
    key: "_snapClampSetValue",
    value: function _snapClampSetValue(t) {
      this.setValue(this._clamp(this._snap(t)));
    }
  }, {
    key: "_hasScrollBar",
    get: function get() {
      var t = this.parent.root.$children;
      return t.scrollHeight > t.clientHeight;
    }
  }, {
    key: "_hasMin",
    get: function get() {
      return void 0 !== this._min;
    }
  }, {
    key: "_hasMax",
    get: function get() {
      return void 0 !== this._max;
    }
  }]);
  return d;
}(t);
exports.NumberController = d;
var c = /*#__PURE__*/function (_t23) {
  _inherits(c, _t23);
  var _super5 = _createSuper(c);
  function c(t, i, e, s) {
    var _this7;
    _classCallCheck(this, c);
    _this7 = _super5.call(this, t, i, e, "option"), _this7.$select = document.createElement("select"), _this7.$select.setAttribute("aria-labelledby", _this7.$name.id), _this7.$display = document.createElement("div"), _this7.$display.classList.add("display"), _this7._values = Array.isArray(s) ? s : Object.values(s), _this7._names = Array.isArray(s) ? s : Object.keys(s), _this7._names.forEach(function (t) {
      var i = document.createElement("option");
      i.innerHTML = t, _this7.$select.appendChild(i);
    }), _this7.$select.addEventListener("change", function () {
      _this7.setValue(_this7._values[_this7.$select.selectedIndex]), _this7._callOnFinishChange();
    }), _this7.$select.addEventListener("focus", function () {
      _this7.$display.classList.add("focus");
    }), _this7.$select.addEventListener("blur", function () {
      _this7.$display.classList.remove("focus");
    }), _this7.$widget.appendChild(_this7.$select), _this7.$widget.appendChild(_this7.$display), _this7.$disable = _this7.$select, _this7.updateDisplay();
    return _this7;
  }
  _createClass(c, [{
    key: "updateDisplay",
    value: function updateDisplay() {
      var t = this.getValue(),
        i = this._values.indexOf(t);
      return this.$select.selectedIndex = i, this.$display.innerHTML = -1 === i ? t : this._names[i], this;
    }
  }]);
  return c;
}(t);
exports.OptionController = c;
var u = /*#__PURE__*/function (_t24) {
  _inherits(u, _t24);
  var _super6 = _createSuper(u);
  function u(t, i, e) {
    var _this8;
    _classCallCheck(this, u);
    _this8 = _super6.call(this, t, i, e, "string"), _this8.$input = document.createElement("input"), _this8.$input.setAttribute("type", "text"), _this8.$input.setAttribute("aria-labelledby", _this8.$name.id), _this8.$input.addEventListener("input", function () {
      _this8.setValue(_this8.$input.value);
    }), _this8.$input.addEventListener("keydown", function (t) {
      "Enter" === t.code && _this8.$input.blur();
    }), _this8.$input.addEventListener("blur", function () {
      _this8._callOnFinishChange();
    }), _this8.$widget.appendChild(_this8.$input), _this8.$disable = _this8.$input, _this8.updateDisplay();
    return _this8;
  }
  _createClass(u, [{
    key: "updateDisplay",
    value: function updateDisplay() {
      return this.$input.value = this.getValue(), this;
    }
  }]);
  return u;
}(t);
exports.StringController = u;
var p = !1;
var g = /*#__PURE__*/function () {
  function g() {
    var _this9 = this;
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      t = _ref4.parent,
      _ref4$autoPlace = _ref4.autoPlace,
      i = _ref4$autoPlace === void 0 ? void 0 === t : _ref4$autoPlace,
      e = _ref4.container,
      s = _ref4.width,
      _ref4$title = _ref4.title,
      n = _ref4$title === void 0 ? "Controls" : _ref4$title,
      _ref4$injectStyles = _ref4.injectStyles,
      l = _ref4$injectStyles === void 0 ? !0 : _ref4$injectStyles,
      _ref4$touchStyles = _ref4.touchStyles,
      r = _ref4$touchStyles === void 0 ? !0 : _ref4$touchStyles;
    _classCallCheck(this, g);
    if (this.parent = t, this.root = t ? t.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = !1, this._hidden = !1, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("div"), this.$title.classList.add("title"), this.$title.setAttribute("role", "button"), this.$title.setAttribute("aria-expanded", !0), this.$title.setAttribute("tabindex", 0), this.$title.addEventListener("click", function () {
      return _this9.openAnimated(_this9._closed);
    }), this.$title.addEventListener("keydown", function (t) {
      "Enter" !== t.code && "Space" !== t.code || (t.preventDefault(), _this9.$title.click());
    }), this.$title.addEventListener("touchstart", function () {}, {
      passive: !0
    }), this.$children = document.createElement("div"), this.$children.classList.add("children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(n), r && this.domElement.classList.add("allow-touch-styles"), this.parent) return this.parent.children.push(this), this.parent.folders.push(this), void this.parent.$children.appendChild(this.domElement);
    this.domElement.classList.add("root"), !p && l && (!function (t) {
      var i = document.createElement("style");
      i.innerHTML = t;
      var e = document.querySelector("head link[rel=stylesheet], head style");
      e ? document.head.insertBefore(i, e) : document.head.appendChild(i);
    }('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'), p = !0), e ? e.appendChild(this.domElement) : i && (this.domElement.classList.add("autoPlace"), document.body.appendChild(this.domElement)), s && this.domElement.style.setProperty("--width", s + "px"), this.domElement.addEventListener("keydown", function (t) {
      return t.stopPropagation();
    }), this.domElement.addEventListener("keyup", function (t) {
      return t.stopPropagation();
    });
  }
  _createClass(g, [{
    key: "add",
    value: function add(t, e, s, n, l) {
      if (Object(s) === s) return new c(this, t, e, s);
      var r = t[e];
      switch (_typeof(r)) {
        case "number":
          return new d(this, t, e, s, n, l);
        case "boolean":
          return new i(this, t, e);
        case "string":
          return new u(this, t, e);
        case "function":
          return new h(this, t, e);
      }
      console.error("gui.add failed\n\tproperty:", e, "\n\tobject:", t, "\n\tvalue:", r);
    }
  }, {
    key: "addColor",
    value: function addColor(t, i) {
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return new a(this, t, i, e);
    }
  }, {
    key: "addFolder",
    value: function addFolder(t) {
      return new g({
        parent: this,
        title: t
      });
    }
  }, {
    key: "load",
    value: function load(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return t.controllers && this.controllers.forEach(function (i) {
        i instanceof h || i._name in t.controllers && i.load(t.controllers[i._name]);
      }), i && t.folders && this.folders.forEach(function (i) {
        i._title in t.folders && i.load(t.folders[i._title]);
      }), this;
    }
  }, {
    key: "save",
    value: function save() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      var i = {
        controllers: {},
        folders: {}
      };
      return this.controllers.forEach(function (t) {
        if (!(t instanceof h)) {
          if (t._name in i.controllers) throw new Error("Cannot save GUI with duplicate property \"".concat(t._name, "\""));
          i.controllers[t._name] = t.save();
        }
      }), t && this.folders.forEach(function (t) {
        if (t._title in i.folders) throw new Error("Cannot save GUI with duplicate folder \"".concat(t._title, "\""));
        i.folders[t._title] = t.save();
      }), i;
    }
  }, {
    key: "open",
    value: function open() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this._closed = !t, this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("closed", this._closed), this;
    }
  }, {
    key: "close",
    value: function close() {
      return this.open(!1);
    }
  }, {
    key: "show",
    value: function show() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this._hidden = !t, this.domElement.style.display = this._hidden ? "none" : "", this;
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.show(!1);
    }
  }, {
    key: "openAnimated",
    value: function openAnimated() {
      var _this10 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return this._closed = !t, this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(function () {
        var i = _this10.$children.clientHeight;
        _this10.$children.style.height = i + "px", _this10.domElement.classList.add("transition");
        var e = function e(t) {
          t.target === _this10.$children && (_this10.$children.style.height = "", _this10.domElement.classList.remove("transition"), _this10.$children.removeEventListener("transitionend", e));
        };
        _this10.$children.addEventListener("transitionend", e);
        var s = t ? _this10.$children.scrollHeight : 0;
        _this10.domElement.classList.toggle("closed", !t), requestAnimationFrame(function () {
          _this10.$children.style.height = s + "px";
        });
      }), this;
    }
  }, {
    key: "title",
    value: function title(t) {
      return this._title = t, this.$title.innerHTML = t, this;
    }
  }, {
    key: "reset",
    value: function reset() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return (t ? this.controllersRecursive() : this.controllers).forEach(function (t) {
        return t.reset();
      }), this;
    }
  }, {
    key: "onChange",
    value: function onChange(t) {
      return this._onChange = t, this;
    }
  }, {
    key: "_callOnChange",
    value: function _callOnChange(t) {
      this.parent && this.parent._callOnChange(t), void 0 !== this._onChange && this._onChange.call(this, {
        object: t.object,
        property: t.property,
        value: t.getValue(),
        controller: t
      });
    }
  }, {
    key: "onFinishChange",
    value: function onFinishChange(t) {
      return this._onFinishChange = t, this;
    }
  }, {
    key: "_callOnFinishChange",
    value: function _callOnFinishChange(t) {
      this.parent && this.parent._callOnFinishChange(t), void 0 !== this._onFinishChange && this._onFinishChange.call(this, {
        object: t.object,
        property: t.property,
        value: t.getValue(),
        controller: t
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach(function (t) {
        return t.destroy();
      });
    }
  }, {
    key: "controllersRecursive",
    value: function controllersRecursive() {
      var t = Array.from(this.controllers);
      return this.folders.forEach(function (i) {
        t = t.concat(i.controllersRecursive());
      }), t;
    }
  }, {
    key: "foldersRecursive",
    value: function foldersRecursive() {
      var t = Array.from(this.folders);
      return this.folders.forEach(function (i) {
        t = t.concat(i.foldersRecursive());
      }), t;
    }
  }]);
  return g;
}();
exports.GUI = g;
var _default = g;
exports.default = _default;
},{}],"src/TrichoidPocketController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrichoidPocketController = void 0;
var lil = _interopRequireWildcard(require("./libraries/lil-gui.min"));
var _TrichoidRectanglePocket = require("./TrichoidRectanglePocket.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TrichoidPocketController = /*#__PURE__*/function () {
  function TrichoidPocketController(pocket) {
    _classCallCheck(this, TrichoidPocketController);
    this.isCornerRadius = {
      value: false
    };
    this.cornerMessage = {
      value: 'Corners start at top left and wind counter-clockwise'
    };
    this.emptyString = {
      value: ''
    };
    this.pocket = pocket;
    this.gui = new lil.GUI().title('Pocket');
    this.init();
  }
  _createClass(TrichoidPocketController, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.cutParamsFolder = this.gui.addFolder('Cut Parameters');
      this.cutParamsFolder.add(this.pocket.cutParams, 'aDoC');
      this.cutParamsFolder.add(this.pocket.cutParams, 'rDoC');
      this.cutParamsFolder.add(this.pocket.cutParams, 'speed');
      this.cutParamsFolder.add(this.pocket.cutParams, 'feed');
      this.finishParamsFolder = this.cutParamsFolder.addFolder('Finish');
      this.finishParamsFolder.add(this.pocket.finishParams, 'aDoC');
      this.finishParamsFolder.add(this.pocket.finishParams, 'rDoC');
      this.finishParamsFolder.add(this.pocket.finishParams, 'speed');
      this.finishParamsFolder.add(this.pocket.finishParams, 'feed');
      //this.finishParamsFolder.close( );
      this.cutParamsFolder.close();
      this.toolFolder = this.gui.addFolder('Tooling');
      this.toolFolder.add(this.pocket, 'isSeperateFinish').name('Seperate Finish Tool?').onChange(function () {
        _this.toggleFinishTool();
      });
      this.finishToolFolder = this.toolFolder.addFolder('Finish Tool');
      this.finishToolFolder.add(this.pocket.tools.finishTool, 'toolNumber').name('Tool Number');
      if (!this.pocket.isSeperateFinish) {
        this.finishToolFolder.hide();
      }
      this.roughingToolFolder = this.toolFolder.addFolder('Roughing Tool');
      this.roughingToolFolder.add(this.pocket.tools.roughingTool, 'toolNumber').name('Tool Number');
      this.toolFolder.close();
      this.rectFolder = this.gui.addFolder('Rectangle');
      this.rectFolder.add(this.pocket.rectangle, 'centerX', .001, 100, .0001).name('Center X');
      this.rectFolder.add(this.pocket.rectangle, 'centerY', .001, 100, .0001).name('Center Y');
      this.rectFolder.add(this.pocket.rectangle, 'width', .001, 100, .0001).name('Width');
      this.rectFolder.add(this.pocket.rectangle, 'height', .001, 100, .0001).name('Height');
      this.rectFolder.close();
      this.cornerFolder = this.gui.addFolder('Corners');
      this.cornerFolder.add(this.isCornerRadius, 'value').onChange(function () {
        _this.toggleGuiCorners();
      }).name('Custom Corners');
      this.cornerRadiusFolder = this.cornerFolder.addFolder('Radii');
      this.cornerRadiusFolder.add(this.pocket.corners[0], 'radius', .001, 100, .0001).name('Corner 1');
      this.cornerRadiusFolder.add(this.pocket.corners[1], 'radius', .001, 100, .0001).name('Corner 2');
      this.cornerRadiusFolder.add(this.pocket.corners[2], 'radius', .001, 100, .0001).name('Corner 3');
      this.cornerRadiusFolder.add(this.pocket.corners[3], 'radius', .001, 100, .0001).name('Corner 4');
      this.cornerRadiusFolder.hide();
      this.entrySettingsFolder = this.gui.addFolder('Entry Settings');
      this.entrySettingsFolder.add(this.pocket, 'entryLocation', _TrichoidRectanglePocket.ENTRYLOCATION).name('Location');
      this.entrySettingsFolder.add(this.pocket, 'entryType', _TrichoidRectanglePocket.ENTRYTYPE).name('Style');
      this.entrySettingsFolder.close();
    }
  }, {
    key: "toggleGuiCorners",
    value: function toggleGuiCorners() {
      if (this.isCornerRadius.value) {
        this.cornerRadiusFolder.open();
        this.cornerRadiusFolder.show();
        return;
      }
      this.cornerRadiusFolder.close();
      this.cornerRadiusFolder.hide();
    }
  }, {
    key: "toggleFinishTool",
    value: function toggleFinishTool() {
      if (this.pocket.isSeperateFinish) {
        this.finishToolFolder.open();
        this.finishToolFolder.show();
        return;
      }
      this.finishToolFolder.close();
      this.finishToolFolder.hide();
    }
  }, {
    key: "stickyFolder",
    value: function stickyFolder(folder) {
      console.log('sticky');
      folder.open();
    }
  }]);
  return TrichoidPocketController;
}();
exports.TrichoidPocketController = TrichoidPocketController;
},{"./libraries/lil-gui.min":"src/libraries/lil-gui.min.js","./TrichoidRectanglePocket.js":"src/TrichoidRectanglePocket.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var _TrichoidRectanglePocket = require("./TrichoidRectanglePocket.js");
var _TrichoidPocketController = require("./TrichoidPocketController.js");
var rect = new _TrichoidRectanglePocket.Rectangle(2, 3, 4, 5.125);
console.log(rect.centerX);
var cutParams = new _TrichoidRectanglePocket.CutParams(0, 0, 0, 0);
console.log(cutParams);
var finishParams = new _TrichoidRectanglePocket.CutParams(0, 0, 0, 0);
var tools = {
  finishTool: new _TrichoidRectanglePocket.Tool(0),
  roughingTool: new _TrichoidRectanglePocket.Tool(0)
};
var corners = [new _TrichoidRectanglePocket.Corner(0.125), new _TrichoidRectanglePocket.Corner(0.125), new _TrichoidRectanglePocket.Corner(0.125), new _TrichoidRectanglePocket.Corner(0.125)];
console.log(corners);
var pocket = new _TrichoidRectanglePocket.TrichoidRectanglePocket(rect, cutParams, tools, corners, 0.01, _TrichoidRectanglePocket.ENTRYTYPE.spiral, _TrichoidRectanglePocket.ENTRYLOCATION.center, finishParams, false);
console.log("initial pocket data set");
var pocketController = new _TrichoidPocketController.TrichoidPocketController(pocket);

// variable for the namespace
var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementById("gridSVG");
svg.style.width = window.innerWidth + "px";
svg.style.height = window.innerHeight + "px";
svg.setAttribute("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight);
//svg.viewBox()

function createSVGPath(d, width, color) {
  var newPath = document.createElementNS(svgns, "path");
  newPath.setAttribute("d", d);
  newPath.setAttribute("stroke-width", width);
  newPath.setAttribute("stroke", color);
  newPath.setAttribute("fill", "none");
  return newPath;
}
function createSVGLine(x1, y1, x2, y2, width, color) {
  var newLine = document.createElementNS(svgns, "line");
  newLine.setAttribute("x1", x1);
  newLine.setAttribute("y1", y1);
  newLine.setAttribute("x2", x2);
  newLine.setAttribute("y2", y2);
  newLine.setAttribute("stroke-width", width);
  newLine.setAttribute("stroke", color);
  return newLine;
}

/*
<circle
cx="0"
cy="0"
r="90"
fill="transparent"
stroke="#f0f0c9"
stroke-width="7"
/>
*/
function createSVGCircle(cx, cy, r, width, color) {
  var newCircle = document.createElementNS(svgns, "circle");
  newCircle.setAttribute("cx", cx);
  newCircle.setAttribute("cy", cy);
  newCircle.setAttribute("r", r);
  newCircle.setAttribute("fill", "transparent");
  newCircle.setAttribute("stroke-width", width);
  newCircle.setAttribute("stroke", color);
  return newCircle;
}

//A rx ry x-axis-rotation large-arc-flag sweep-flag x y
function createSVGSemiCircle(cx, cy, radius, sx, sy, ex, ey) {
  var angles = getSemiCircleAnglesFromEndpoints(cx, cy, sx, sy, ex, ey);
  var deltaAngle = angles.ea - angles.sa;
  var largeArc = deltaAngle > 180;
  //let newSemiCircle = document.createElementNS(svgns, 'arc');
  var arcString = "M ".concat(sx, " ").concat(sy, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc ? 1 : 0, "  1 ").concat(ex, "  ").concat(ey);
  return arcString;
}
function getSemiCircleEndpoints(cx, cy, radius, sa, ea) {
  return {
    sx: cx + radius * Math.cos(sa * Math.PI / 180),
    sy: cy + radius * Math.sin(sa * Math.PI / 180),
    ex: cx + radius * Math.cos(ea * Math.PI / 180),
    ey: cy + radius * Math.sin(ea * Math.PI / 180)
  };
}
function getSemiCircleAnglesFromEndpoints(cx, cy, sx, sy, ex, ey) {
  var deltaXStart = sx - cx;
  var deltaYStart = sy - cy;
  var deltaXEnd = ex - cx;
  var deltaYEnd = ey - cy;
  return {
    sa: Math.atan2(deltaYStart, deltaXStart) * 180 / Math.PI,
    ea: Math.atan2(deltaYEnd, deltaXEnd) * 180 / Math.PI
  };
}
function getSemiCircleXAtY(cx, cy, r, y) {
  //(x - cx)^2 + (y - cy)^2 = r^2
  //(x - cx)^2 = r^2 - (y - cy)^2
  //x - cx = sqrt(r^2 - (y-cy)^2)
  //x = sqrt(r^2 - (y-cy)^2) + cx
  // x = cx + or - sqrt(r^2 - (y - cy)^2)
  var underSquare = Math.sqrt(r * r - Math.pow(y - cy, 2));
  return {
    plus: cx + underSquare,
    minus: cx - underSquare
  };
}

//(x - cx)^2 + (y - cy)^2 = r^2

function getArcCenter(x1, y1, x2, y2, r) {
  var center = {
    x: 0,
    y: 0
  };
  return center;
}
function generatePath(cx, cy, radius, width, step, distance, color) {
  var sx = cx + radius;
  var sy = cy;
  var ex = cx - radius;
  var ey = cy;
  var arcString = createSVGSemiCircle(cx, cy, radius, sx, sy, ex, ey);
  var testPath = createSVGPath("", width, color);
  for (var i = 0; i < distance / step; i++) {
    var prevCenterY = cy + (i - 1) * step;
    var centerY = cy + i * step;
    var nextCenterY = cy + (i + 1) * 20;
    var arcStartX = getSemiCircleXAtY(cx, centerY, radius, prevCenterY);
    var nextStartX = getSemiCircleXAtY(cx, nextCenterY, radius, centerY);
    var arc = createSVGSemiCircle(cx, centerY, radius, arcStartX.plus, prevCenterY, ex, centerY);
    var connectingLine = " L ".concat(arcStartX.plus, ", ").concat(centerY);
    testPath.setAttribute("d", testPath.getAttribute("d") + arc + connectingLine);
  }
  return testPath;
}

/*
<animateMotion
      dur="10s"
      repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
      */
function createMotionAnimation(motionPath, dur, reps) {
  var newMotion = document.createElementNS(svgns, "animateMotion");
  newMotion.setAttribute("dur", dur);
  newMotion.setAttribute("repeatCount", reps);
  newMotion.setAttribute("path", motionPath);
  console.log("motion path:");
  console.log(newMotion);
  return newMotion;
}
var xPadding = 5;
var yPadding = 5;
var inchWidth = 2;
var inchScalar = (window.innerWidth - xPadding * 2) / inchWidth;
var inchHeight = Math.ceil((window.innerHeight - yPadding * 2) / inchScalar);
console.log(inchScalar);
for (var i = 0; i < inchWidth * 10 + 1; i++) {
  var x1 = xPadding + inchScalar / 10 * i;
  var y1 = yPadding;
  var x2 = xPadding + inchScalar / 10 * i;
  var y2 = window.innerHeight - yPadding;
  svg.appendChild(createSVGLine(x1, y1, x2, y2, 3, "black"));
}
for (var _i = 0; _i < inchHeight * 10 + 1; _i++) {
  var _x = xPadding;
  var _y = yPadding + inchScalar / 10 * _i;
  var _x2 = window.innerWidth - xPadding;
  var _y2 = yPadding + inchScalar / 10 * _i;
  svg.appendChild(createSVGLine(_x, _y, _x2, _y2, 3, "black"));
}
for (var _i2 = 0; _i2 < inchWidth + 1; _i2++) {
  var _x3 = xPadding + inchScalar * _i2;
  var _y3 = yPadding;
  var _x4 = xPadding + inchScalar * _i2;
  var _y4 = window.innerHeight - yPadding;
  svg.appendChild(createSVGLine(_x3, _y3, _x4, _y4, 5, "black"));
}
for (var _i3 = 0; _i3 < inchHeight + 1; _i3++) {
  var _x5 = xPadding;
  var _y5 = yPadding + inchScalar * _i3;
  var _x6 = window.innerWidth - xPadding;
  var _y6 = yPadding + inchScalar * _i3;
  svg.appendChild(createSVGLine(_x5, _y5, _x6, _y6, 5, "black"));
}

//let arcString = createSVGSemiCircle(100, 100, 50, 150, 100, 50, 100);

var functionPath = generatePath(500, 25, 50, 2, 30, 400, "red");
var cutPath = generatePath(500, 25, 50, 70, 30, 400, "green");
cutPath.setAttribute("stroke-dasharray", "".concat(cutPath.getTotalLength() + 1, " px"));
svg.appendChild(cutPath);
svg.appendChild(functionPath);
var tool = createSVGCircle(0, 0, 35, 10, "blue");
tool.appendChild(createMotionAnimation(functionPath.getAttribute("d"), "10", "5"));
svg.appendChild(tool);
console.log("index.js finished");

//end
},{"./styles.css":"src/styles.css","./TrichoidRectanglePocket.js":"src/TrichoidRectanglePocket.js","./TrichoidPocketController.js":"src/TrichoidPocketController.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39389" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map