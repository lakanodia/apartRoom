(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// import functions
var _classlist_polyfill = _interopRequireDefault(require("./modules/classlist_polyfill"));
var _foreach_polyfill = _interopRequireDefault(require("./modules/foreach_polyfill"));
var _focus_accessibility = _interopRequireDefault(require("./modules/focus_accessibility"));
var _type_ratio_interpolation = _interopRequireDefault(require("./modules/type_ratio_interpolation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
    polyfill to enable use of forEach on node lists in IE11
*/
(0, _foreach_polyfill["default"])();
/*
    polyfill to allow use of replace method
    on a classList in internet explorer
*/
(0, _classlist_polyfill["default"])();
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
(0, _type_ratio_interpolation["default"])();
/*
    allow enchanced focus detection (depends on a11y.js)
*/
(0, _focus_accessibility["default"])();

},{"./modules/classlist_polyfill":2,"./modules/focus_accessibility":3,"./modules/foreach_polyfill":4,"./modules/type_ratio_interpolation":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
/*
    polyfill to allow use of replace method on a classList in internet explorer
*/
function _default() {
  if (!("replace" in document.createElement("_").classList)) {
    DOMTokenList.prototype.replace = function (token, replacementToken) {
      var tokens = this.toString().split(" ");
      var index = tokens.indexOf(token + "");
      if (~index) {
        tokens = tokens.slice(index);
        this.remove.apply(this, tokens);
        this.add(replacementToken);
        this.add.apply(this, tokens.slice(1));
      }
    };
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
/*
    allow enchanced focus detection (depends on a11y.js)
*/
function _default() {
  /* global ally */
  // inform the developer that a11y.js has loaded
  console.info("loaded version", ally.version, "of a11y.js");
  // detect focus source using a11y.js, which will be stored
  // as CSS classes on the `html` element
  var focusSource = ally.style.focusSource(); // eslint-disable-line no-unused-vars
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
/*
    polyfill to enable use of forEach on node lists in IE11
*/
function _default() {
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function scale_ratio(current_viewport_width, minimum_value, maximum_value) {
  // store the minimum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.
  var min_range = 480;
  // store the maximum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.
  var max_range = 1680;
  // calculate and store the rate at wich our ratio changes
  // when the viewport width changes by 1px
  var rate_of_change = (maximum_value - minimum_value) / (max_range - min_range);
  // store the intercept (the value of Y when all X=0)
  var value_at_viewport_zero = minimum_value - rate_of_change * min_range;
  // if we follow a linear progression from ratio m at viewport M,
  // to ratio n at viewport N, calculate and store the ratio at viewport X
  var interpolated_ratio = current_viewport_width * rate_of_change + value_at_viewport_zero;
  // use `interpolated_ratio` value if it's within range.
  // if it would be smaller than the smallest acceptable ratio, use the smallest.
  // if it would be larger than the largest acceptable ratio, use the largest.
  var bounded_ratio = Math.max(minimum_value, Math.min(interpolated_ratio, maximum_value));
  // store final ratio in CSS custom property `--ratio`
  document.documentElement.style.setProperty("--ratio", bounded_ratio);
}
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
function _default() {
  // store the lowest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var type_ratio_low = 1.125;
  // store the highest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var type_ratio_high = 1.28;
  // store the current viewport width
  var screen_width = window.innerWidth;
  // apply the ratio scaling function, to apply
  // the ratio for the current viewport width
  scale_ratio(screen_width, type_ratio_low, type_ratio_high);
  // watch for change in the viewport width
  window.addEventListener("resize", function () {
    // store the current viewport width
    var screen_width = window.innerWidth;
    // recalculate ratio when change is detected
    scale_ratio(screen_width, type_ratio_low, type_ratio_high);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hc3NldHMvanMvYXBwLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvY2xhc3NsaXN0X3BvbHlmaWxsLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvZm9jdXNfYWNjZXNzaWJpbGl0eS5qcyIsIi4uL2Fzc2V0cy9qcy9tb2R1bGVzL2ZvcmVhY2hfcG9seWZpbGwuanMiLCIuLi9hc3NldHMvanMvbW9kdWxlcy90eXBlX3JhdGlvX2ludGVycG9sYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZOztBQUNaO0FBQ0EsSUFBQSxtQkFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEsaUJBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLG9CQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSx5QkFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUEwRSxTQUFBLHVCQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLFVBQUEsR0FBQSxHQUFBLGdCQUFBLEdBQUE7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsSUFBQSw0QkFBaUIsRUFBQyxDQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBQSw4QkFBa0IsRUFBQyxDQUFDO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBQSxvQ0FBd0IsRUFBQyxDQUFDO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLElBQUEsK0JBQW1CLEVBQUMsQ0FBQzs7Ozs7Ozs7O0FDdkJyQjtBQUNBO0FBQ0E7QUFDZSxTQUFBLFNBQUEsRUFBWTtFQUN2QixJQUFJLEVBQUUsU0FBUyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFDdkQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLEVB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LEdBQUcsTUFBTSxDQUFDLFVBQVU7SUFDdEM7SUFDQSxXQUFXLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7RUFDOUQsQ0FBQyxDQUFDO0FBQ04iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbi8vIGltcG9ydCBmdW5jdGlvbnNcbmltcG9ydCBjbGFzc2xpc3RfcG9seWZpbGwgZnJvbSBcIi4vbW9kdWxlcy9jbGFzc2xpc3RfcG9seWZpbGxcIjtcbmltcG9ydCBmb3JfZWFjaF9wb2x5ZmlsbCBmcm9tIFwiLi9tb2R1bGVzL2ZvcmVhY2hfcG9seWZpbGxcIjtcbmltcG9ydCBmb2N1c19hY2Nlc3NpYmlsaXR5IGZyb20gXCIuL21vZHVsZXMvZm9jdXNfYWNjZXNzaWJpbGl0eVwiO1xuaW1wb3J0IHR5cGVfcmF0aW9faW50ZXJwb2xhdGlvbiBmcm9tIFwiLi9tb2R1bGVzL3R5cGVfcmF0aW9faW50ZXJwb2xhdGlvblwiO1xuLypcbiAgICBwb2x5ZmlsbCB0byBlbmFibGUgdXNlIG9mIGZvckVhY2ggb24gbm9kZSBsaXN0cyBpbiBJRTExXG4qL1xuZm9yX2VhY2hfcG9seWZpbGwoKTtcbi8qXG4gICAgcG9seWZpbGwgdG8gYWxsb3cgdXNlIG9mIHJlcGxhY2UgbWV0aG9kXG4gICAgb24gYSBjbGFzc0xpc3QgaW4gaW50ZXJuZXQgZXhwbG9yZXJcbiovXG5jbGFzc2xpc3RfcG9seWZpbGwoKTtcbi8qXG4gICAgaW50ZXJwb2xhdGUgYmV0d2VlbiB0eXBlIHJhdGlvIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLFxuICAgIGFuZCBzdG9yZSB0aGUgcmVzdWx0IGluIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuKi9cbnR5cGVfcmF0aW9faW50ZXJwb2xhdGlvbigpO1xuLypcbiAgICBhbGxvdyBlbmNoYW5jZWQgZm9jdXMgZGV0ZWN0aW9uIChkZXBlbmRzIG9uIGExMXkuanMpXG4qL1xuZm9jdXNfYWNjZXNzaWJpbGl0eSgpO1xuIiwiLypcbiAgICBwb2x5ZmlsbCB0byBhbGxvdyB1c2Ugb2YgcmVwbGFjZSBtZXRob2Qgb24gYSBjbGFzc0xpc3QgaW4gaW50ZXJuZXQgZXhwbG9yZXJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoXCJyZXBsYWNlXCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikuY2xhc3NMaXN0KSkge1xuICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodG9rZW4sIHJlcGxhY2VtZW50VG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggID0gdG9rZW5zLmluZGV4T2YodG9rZW4gKyBcIlwiKTtcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlLmFwcGx5KHRoaXMsIHRva2Vucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQocmVwbGFjZW1lbnRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQuYXBwbHkodGhpcywgdG9rZW5zLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKlxuICAgIGFsbG93IGVuY2hhbmNlZCBmb2N1cyBkZXRlY3Rpb24gKGRlcGVuZHMgb24gYTExeS5qcylcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgLyogZ2xvYmFsIGFsbHkgKi9cbiAgICAvLyBpbmZvcm0gdGhlIGRldmVsb3BlciB0aGF0IGExMXkuanMgaGFzIGxvYWRlZFxuICAgIGNvbnNvbGUuaW5mbyhcImxvYWRlZCB2ZXJzaW9uXCIsIGFsbHkudmVyc2lvbiwgXCJvZiBhMTF5LmpzXCIpO1xuICAgIC8vIGRldGVjdCBmb2N1cyBzb3VyY2UgdXNpbmcgYTExeS5qcywgd2hpY2ggd2lsbCBiZSBzdG9yZWRcbiAgICAvLyBhcyBDU1MgY2xhc3NlcyBvbiB0aGUgYGh0bWxgIGVsZW1lbnRcbiAgICBjb25zdCBmb2N1c1NvdXJjZSA9IGFsbHkuc3R5bGUuZm9jdXNTb3VyY2UoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xufVxuIiwiLypcbiAgICBwb2x5ZmlsbCB0byBlbmFibGUgdXNlIG9mIGZvckVhY2ggb24gbm9kZSBsaXN0cyBpbiBJRTExXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIGlmIChcIk5vZGVMaXN0XCIgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgICAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJmdW5jdGlvbiBzY2FsZV9yYXRpbyAoY3VycmVudF92aWV3cG9ydF93aWR0aCwgbWluaW11bV92YWx1ZSwgbWF4aW11bV92YWx1ZSkge1xuICAgIC8vIHN0b3JlIHRoZSBtaW5pbXVtIHZpZXdwb3J0IHdpZHRoIGF0IHdoaWNoIGAtLXJhdGlvYFxuICAgIC8vIGN1c3RvbSBwcm9wZXJ0eSB3aWxsIGJlIHNldC4gdGhpcyBtdXN0IG1hdGNoIHZhbHVlc1xuICAgIC8vIHNldCBpbiBgYnJlYWtwb2ludHMuc3R5bGAgJiBgdHlwb2dyYXBoeS5zdHlsYC5cbiAgICBjb25zdCBtaW5fcmFuZ2UgPSA0ODA7XG4gICAgLy8gc3RvcmUgdGhlIG1heGltdW0gdmlld3BvcnQgd2lkdGggYXQgd2hpY2ggYC0tcmF0aW9gXG4gICAgLy8gY3VzdG9tIHByb3BlcnR5IHdpbGwgYmUgc2V0LiB0aGlzIG11c3QgbWF0Y2ggdmFsdWVzXG4gICAgLy8gc2V0IGluIGBicmVha3BvaW50cy5zdHlsYCAmIGB0eXBvZ3JhcGh5LnN0eWxgLlxuICAgIGNvbnN0IG1heF9yYW5nZSA9IDE2ODA7XG4gICAgLy8gY2FsY3VsYXRlIGFuZCBzdG9yZSB0aGUgcmF0ZSBhdCB3aWNoIG91ciByYXRpbyBjaGFuZ2VzXG4gICAgLy8gd2hlbiB0aGUgdmlld3BvcnQgd2lkdGggY2hhbmdlcyBieSAxcHhcbiAgICBjb25zdCByYXRlX29mX2NoYW5nZSA9IChtYXhpbXVtX3ZhbHVlIC0gbWluaW11bV92YWx1ZSkgLyAobWF4X3JhbmdlIC0gbWluX3JhbmdlKTtcbiAgICAvLyBzdG9yZSB0aGUgaW50ZXJjZXB0ICh0aGUgdmFsdWUgb2YgWSB3aGVuIGFsbCBYPTApXG4gICAgY29uc3QgdmFsdWVfYXRfdmlld3BvcnRfemVybyA9IG1pbmltdW1fdmFsdWUgLSByYXRlX29mX2NoYW5nZSAqIG1pbl9yYW5nZTtcbiAgICAvLyBpZiB3ZSBmb2xsb3cgYSBsaW5lYXIgcHJvZ3Jlc3Npb24gZnJvbSByYXRpbyBtIGF0IHZpZXdwb3J0IE0sXG4gICAgLy8gdG8gcmF0aW8gbiBhdCB2aWV3cG9ydCBOLCBjYWxjdWxhdGUgYW5kIHN0b3JlIHRoZSByYXRpbyBhdCB2aWV3cG9ydCBYXG4gICAgY29uc3QgaW50ZXJwb2xhdGVkX3JhdGlvID0gY3VycmVudF92aWV3cG9ydF93aWR0aCAqIHJhdGVfb2ZfY2hhbmdlICsgdmFsdWVfYXRfdmlld3BvcnRfemVybztcbiAgICAvLyB1c2UgYGludGVycG9sYXRlZF9yYXRpb2AgdmFsdWUgaWYgaXQncyB3aXRoaW4gcmFuZ2UuXG4gICAgLy8gaWYgaXQgd291bGQgYmUgc21hbGxlciB0aGFuIHRoZSBzbWFsbGVzdCBhY2NlcHRhYmxlIHJhdGlvLCB1c2UgdGhlIHNtYWxsZXN0LlxuICAgIC8vIGlmIGl0IHdvdWxkIGJlIGxhcmdlciB0aGFuIHRoZSBsYXJnZXN0IGFjY2VwdGFibGUgcmF0aW8sIHVzZSB0aGUgbGFyZ2VzdC5cbiAgICBjb25zdCBib3VuZGVkX3JhdGlvID0gTWF0aC5tYXgobWluaW11bV92YWx1ZSwgTWF0aC5taW4oaW50ZXJwb2xhdGVkX3JhdGlvLCBtYXhpbXVtX3ZhbHVlKSk7XG4gICAgLy8gc3RvcmUgZmluYWwgcmF0aW8gaW4gQ1NTIGN1c3RvbSBwcm9wZXJ0eSBgLS1yYXRpb2BcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLXJhdGlvXCIsIGJvdW5kZWRfcmF0aW8pO1xufVxuLypcbiAgICBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR5cGUgcmF0aW8gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMsXG4gICAgYW5kIHN0b3JlIHRoZSByZXN1bHQgaW4gYSBDU1MgY3VzdG9tIHByb3BlcnR5XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIC8vIHN0b3JlIHRoZSBsb3dlc3QgcmF0aW8gdG8gdXNlIGZvciBvdXIgdHlwb2dyYXBoaWMgc2NhbGUuXG4gICAgLy8gVGhpcyBtdXN0IG1hdGNoIHRoZSB2YWx1ZSBzZXQgaW4gYHR5cG9ncmFwaGljLXZhcmlhYmxlcy5zdHlsYC5cbiAgICBjb25zdCB0eXBlX3JhdGlvX2xvdyA9IDEuMTI1O1xuICAgIC8vIHN0b3JlIHRoZSBoaWdoZXN0IHJhdGlvIHRvIHVzZSBmb3Igb3VyIHR5cG9ncmFwaGljIHNjYWxlLlxuICAgIC8vIFRoaXMgbXVzdCBtYXRjaCB0aGUgdmFsdWUgc2V0IGluIGB0eXBvZ3JhcGhpYy12YXJpYWJsZXMuc3R5bGAuXG4gICAgY29uc3QgdHlwZV9yYXRpb19oaWdoID0gMS4yODtcbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aFxuICAgIGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIC8vIGFwcGx5IHRoZSByYXRpbyBzY2FsaW5nIGZ1bmN0aW9uLCB0byBhcHBseVxuICAgIC8vIHRoZSByYXRpbyBmb3IgdGhlIGN1cnJlbnQgdmlld3BvcnQgd2lkdGhcbiAgICBzY2FsZV9yYXRpbyhzY3JlZW5fd2lkdGgsIHR5cGVfcmF0aW9fbG93LCB0eXBlX3JhdGlvX2hpZ2gpO1xuICAgIC8vIHdhdGNoIGZvciBjaGFuZ2UgaW4gdGhlIHZpZXdwb3J0IHdpZHRoXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aFxuICAgICAgICBjb25zdCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgLy8gcmVjYWxjdWxhdGUgcmF0aW8gd2hlbiBjaGFuZ2UgaXMgZGV0ZWN0ZWRcbiAgICAgICAgc2NhbGVfcmF0aW8oc2NyZWVuX3dpZHRoLCB0eXBlX3JhdGlvX2xvdywgdHlwZV9yYXRpb19oaWdoKTtcbiAgICB9KTtcbn1cbiJdfQ==
